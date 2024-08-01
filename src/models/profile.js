import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  isPremiumUser: Boolean,
  memberShipType: String,
  memberShipStartDate: String,
  memberShipEndDate: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyRole: String,
  },
  candidateInfo: {
    name: String,
    resume: String,
    currentCompany: String,
    previousCompanies : String,
    currentJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    preferedJobLocation: String,
    currentSalary: String,
    skills: String,
    totalExperience: String,
    collage: String,
    collageLocation: String,
    graduatedYear: String,
    linkedinProfile: String,
    githubProfile: String,
  },
});

const Profile = mongoose.models.Profile || mongoose.model('Profile',ProfileSchema)
export default Profile;