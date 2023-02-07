import {emailOptions, transporter} from "./emailer";

const handler = async (req: any, res?: any) => {
    if (req.method === "GET") {
        try {
            await transporter.sendMail({
                ...emailOptions,
                subject: "Message from client",
                text: "Open to see info",
                html: `<div style="display: flex; flex-direction: column; gap:40px"><h1>${req.query.name}</h1><h1>${req.query.number}</h1><h1>${req.query.place}</h1></div>`
            });
            return res ? res?.status(200)?.json({success: true}) : {success: true}

        } catch (err: any) {
            return res ? res?.status(400)?.json({message: err.message}) : {message: err.message};
        }

    }
    return res ? res?.status(400)?.json({message: "Bad! request"}) : {message: "Bad! request"};

}

export default handler;