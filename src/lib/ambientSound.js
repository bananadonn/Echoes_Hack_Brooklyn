// Web Audio API ambient soundscape generator — no external audio files needed.
// Each era gets a distinct sonic texture via noise filtering + oscillator layers.

const ERA_CONFIGS = {
  early:   { noiseGain: 0.07, filterFreq: 480,  filterType: 'lowpass',  filterQ: 0.8, humFreq: 55,  humGain: 0.025, label: 'pre-1920' },
  jazz:    { noiseGain: 0.06, filterFreq: 2200,  filterType: 'bandpass', filterQ: 0.4, humFreq: 110, humGain: 0.018, label: '1920s-30s' },
  wartime: { noiseGain: 0.09, filterFreq: 750,   filterType: 'lowpass',  filterQ: 1.0, humFreq: 60,  humGain: 0.038, label: '1940s' },
  postwar: { noiseGain: 0.055,filterFreq: 1600,  filterType: 'lowpass',  filterQ: 0.7, humFreq: 80,  humGain: 0.018, label: '1950s-60s' },
  urban:   { noiseGain: 0.08, filterFreq: 1100,  filterType: 'bandpass', filterQ: 0.9, humFreq: 95,  humGain: 0.028, label: '1970s-80s' },
};

function eraToConfig(era) {
  if (!era) return ERA_CONFIGS.wartime;
  const s = era.toLowerCase();
  const y = parseInt(s.match(/\d{4}|\d{3}/)?.[0] ?? '0');
  if (s.includes('1920') || s.includes('1930') || (y >= 1920 && y < 1940)) return ERA_CONFIGS.jazz;
  if (s.includes('1940') || (y >= 1940 && y < 1950)) return ERA_CONFIGS.wartime;
  if (s.includes('1950') || s.includes('1960') || s.includes('1969') || (y >= 1950 && y < 1970)) return ERA_CONFIGS.postwar;
  if (s.includes('1970') || s.includes('1977') || s.includes('1980') || (y >= 1970 && y < 1990)) return ERA_CONFIGS.urban;
  if (y < 1920 || s.includes('1900') || s.includes('1910') || s.includes('1905') || s.includes('1911') || s.includes('1860') || s.includes('1850')) return ERA_CONFIGS.early;
  return ERA_CONFIGS.wartime;
}

function createBrownNoiseBuffer(audioCtx) {
  const sampleRate = audioCtx.sampleRate;
  const length = sampleRate * 5; // 5s loop
  const buffer = audioCtx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let lastOut = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
  }
  return buffer;
}

export class AmbientPlayer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.noiseSource = null;
    this.oscNode = null;
    this.noiseBuffer = null;
    this.running = false;
  }

  _ensureContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.noiseBuffer = createBrownNoiseBuffer(this.ctx);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  play(era) {
    this._ensureContext();
    const cfg = eraToConfig(era);

    // tear down previous nodes
    this._stopNodes();

    // — noise layer —
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = this.noiseBuffer;
    noiseSource.loop = true;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(cfg.noiseGain, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = cfg.filterType;
    filter.frequency.setValueAtTime(cfg.filterFreq, this.ctx.currentTime);
    filter.Q.setValueAtTime(cfg.filterQ ?? 1, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noiseSource.start();
    this.noiseSource = noiseSource;
    this.noiseGainNode = noiseGain;

    // — hum oscillator layer —
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(cfg.humFreq, this.ctx.currentTime);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(cfg.humGain, this.ctx.currentTime);

    // subtle tremolo on the hum
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.3, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(cfg.humGain * 0.4, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();
    this.lfoNode = lfo;

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start();
    this.oscNode = osc;
    this.oscGainNode = oscGain;

    this.running = true;
    this._fadeIn();
  }

  _fadeIn(targetVol = 0.9) {
    if (!this.masterGain) return;
    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
    this.masterGain.gain.linearRampToValueAtTime(targetVol, t + 2.5);
  }

  fadeOut(cb) {
    if (!this.masterGain || !this.running) { cb?.(); return; }
    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
    this.masterGain.gain.linearRampToValueAtTime(0, t + 1.8);
    setTimeout(() => { this._stopNodes(); cb?.(); }, 1900);
  }

  _stopNodes() {
    try { this.noiseSource?.stop(); } catch {}
    try { this.oscNode?.stop(); } catch {}
    try { this.lfoNode?.stop(); } catch {}
    this.noiseSource = null;
    this.oscNode = null;
    this.lfoNode = null;
  }

  stop() {
    this.fadeOut(() => { this.running = false; });
  }

  destroy() {
    this._stopNodes();
    this.ctx?.close();
    this.ctx = null;
  }
}
