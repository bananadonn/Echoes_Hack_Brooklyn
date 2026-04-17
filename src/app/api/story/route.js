export async function POST(request) {
    return Response.json({
        story: "I was in brooklyn and got a bacon egg and cheese the ocky way",
        narrator: { era: "1940s", gender: "female", tone: "gruff"},
        sources: []
    })
}