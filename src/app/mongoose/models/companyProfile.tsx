import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    postalcode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    panNo: { type: String, required: true },
    bankdetails: { type: String, required: true },
    vatNo: { type: String, required: true },
    gstNo: { type: String, required: true },
    email: { type: String, required: true }
});

const companyDetail = mongoose.models.companyDetail || mongoose.model('companyDetail', companyProfileSchema);

export default companyDetail;
