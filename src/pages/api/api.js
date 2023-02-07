export const sendContactForm = async (data) => fetch('api/contact?' + new URLSearchParams({
    name: data.name,
    number: data.number,
    place: data.place
}), {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})
