import mongoose, { Schema, model, models } from "mongoose"

const ExtraPrice = new Schema({
    name: String,
    price: Number
})

const MenuItemSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    sizes: { type: [ExtraPrice] },
    ingredients: { type: [ExtraPrice] },
    category: { type: mongoose.Types.ObjectId }
}, { timestamps: true })

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)