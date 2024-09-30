const mongoose = require('mongoose');
const ApplicationForm = require('../../modules/application/application.model');

exports.add_application = async (req, res) => {
    try {
        const applicationObj = new ApplicationForm({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            contact: req.body.contact,
            educationDetails: req.body.educationDetails, 
            workExperience: req.body.workExperience, 
            knownLanguages: req.body.knownLanguages,
            technicalExperience: req.body.technicalExperience,
            preference: req.body.preference,
        });

        const newApplication = await applicationObj.save();
        if (newApplication) {
            res.status(200).json({
                message: "Application Submitted Successfully",
                newApplication
            });
        } else {
            res.status(500).json({
                message: "Application Not Submitted",
                error: err
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.get_applications = async (req, res) => {
    try {
        const applications = await ApplicationForm.find();
        if (applications.length > 0) {
            res.status(200).json(applications);
        } else {
            res.status(404).json({
                message: "No applications found"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.get_application_by_id = async (req, res) => {
    try {
        const application = await ApplicationForm.findById(req.params.id);
        if (application) {
            res.status(200).json(application);
        } else {
            res.status(404).json({
                message: "Application not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.update_application = async (req, res) => {
    try {
        const updatedApplication = await ApplicationForm.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (updatedApplication) {
            res.status(200).json({
                message: "Application Updated Successfully",
                updatedApplication
            });
        } else {
            res.status(404).json({
                message: "Application not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.delete_application = async (req, res) => {
    try {
        const deletedApplication = await ApplicationForm.findByIdAndRemove(req.params.id);
        
        if (deletedApplication) {
            res.status(200).json({
                message: "Application Deleted Successfully"
            });
        } else {
            res.status(404).json({
                message: "Application not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
