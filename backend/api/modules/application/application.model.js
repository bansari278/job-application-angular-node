const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    boardOrUniversity: String,
    year: Number,
    cgpaOrPercentage: String
});

const WorkExperienceSchema = new mongoose.Schema({
    company: String,
    designation: String,
    from: Date,
    to: Date
});

const KnownLanguageSchema = new mongoose.Schema({
    language: String,
    canRead: { type: Boolean, default: false },
    canWrite: { type: Boolean, default: false },
    canSpeak: { type: Boolean, default: false }
});

const TechnicalExperienceSchema = new mongoose.Schema({
    technology: String,
    level: String,
    
});
const preferenceSchema = new mongoose.Schema({
    preferredLocation: String,
    expectedCTC: String,
    currentCTC: String,
    noticePeriod:String
});

const ApplicationFormSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },

    educationDetails: [EducationSchema],

    workExperience: [WorkExperienceSchema],

    knownLanguages: [KnownLanguageSchema],

    technicalExperience: [TechnicalExperienceSchema],

    preference: preferenceSchema,


});

module.exports = mongoose.model('ApplicationForm', ApplicationFormSchema);
