import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
    companyName: { type: String },
    mobile: { type: String },
    address: { type: String },
    state: { type: String },
    postalcode: { type: String },
    city: { type: String },
    country: { type: String },
    panNo: { type: String },
    bankdetails: { type: String },
    vatNo: { type: String },
    gstNo: { type: String },
    email: { type: String }
});

const companyDetail = mongoose.models.companyDetail || mongoose.model('companyDetail', companyProfileSchema);

export default companyDetail;
