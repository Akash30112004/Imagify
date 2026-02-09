import FormData from "form-data"
import userModel from "../models/userModel.js"
import axios from "axios"


export const generateImage =  async(req, res) =>{
    try {
        const {userId, prompt} = req.body

        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.json({success: false, message: 'Missing Details'})
        }

        if (!process.env.CLIPDROP_API_KEY) {
            return res.json({
                success: false,
                message: 'Server is missing CLIPDROP_API_KEY configuration.'
            })
        }

        if(user.creditBalance === 0 || user.creditBalance < 0){
            return res.json({success: false, message: 'Insufficient Credits.', creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
            'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})

        res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, resultImage})

    } 
    catch (error) {
        const status = error?.response?.status
        const raw = error?.response?.data

        let details = ''
        try {
            if (raw) {
                if (Buffer.isBuffer(raw)) {
                    details = raw.toString('utf8')
                } else if (raw instanceof ArrayBuffer) {
                    details = Buffer.from(raw).toString('utf8')
                } else if (typeof raw === 'string') {
                    details = raw
                } else {
                    details = JSON.stringify(raw)
                }
            }
        } catch {
            // ignore decoding errors
        }

        console.error('Image generation failed', {
            status,
            message: error?.message,
            details,
        })

        const message = status
            ? `Image API error (${status})${details ? `: ${details}` : ''}`
            : (error?.message || 'Image generation failed')

        res.json({success: false, message})
    }
}