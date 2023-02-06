import {emailOptions, transporter} from "./emailer";

const handler = async (req: any, res: any) => {
    if (req.method === "POST") {
        const data = req.body;
        console.log(data);
        try {
            await transporter.sendMail({
                ...emailOptions,
                subject: "Message from client",
                text: "Open to see info",
                html: `<div style="display: flex; flex-direction: column; gap:40px"><h1>${data.name}</h1><h1>${data.number}</h1><h1>${data.place}</h1></div>`
            });
            return res.status(200).json({success: true})

        } catch (err: any) {
            return res.status(400).json({message: err.message})
        }

    }
    return res.status(400).json({message: "Bad! request"})

}

export default handler;