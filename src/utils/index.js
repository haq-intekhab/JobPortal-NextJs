import qs from "query-string";

export const recruiterOnboardFromControl = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your company role",
    componentType: "input",
  },
];

export const recruiterInitialOnboardFormControl = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnboardFormControl = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter your current company name",
    componentType: "input",
  },
  {
    label: "Previous Companies",
    name: "previousCompanies",
    placeholder: "Enter your previous companies name",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentJobLocation",
    placeholder: "Enter your current job location",
    componentType: "input",
  },
  {
    label: "Prefered Job Location",
    name: "preferedJobLocation",
    placeholder: "Enter your prefered job location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your current salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your notice period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience(in year)",
    componentType: "input",
  },
  {
    label: "Collage",
    name: "collage",
    placeholder: "Enter your collage name",
    componentType: "input",
  },
  {
    label: "Collage Location",
    name: "collageLocation",
    placeholder: "Enter your collage location",
    componentType: "input",
  },
  {
    label: "Graduated Year",
    name: "graduatedYear",
    placeholder: "Enter your graduated year",
    componentType: "input",
  },
  {
    label: "LinkedIn Profile",
    name: "linkedinProfile",
    placeholder: "Enter your linkedin profile",
    componentType: "input",
  },
  {
    label: "Github Profile",
    name: "githubProfile",
    placeholder: "Enter your github profile",
    componentType: "input",
  },
];

export const candidateInitialOnboardFormData = {
  resume: "",
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  previousCompanies: "",
  currentSalary: "",
  noticePeriod: "",
  preferedJobLocation: "",
  currentSalary: "",
  skills: "",
  totalExperience: "",
  collage: "",
  collageLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const candidateInitialFormData = {
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  previousCompanies: "",
  currentSalary: "",
  noticePeriod: "",
  preferedJobLocation: "",
  currentSalary: "",
  skills: "",
  totalExperience: "",
  collage: "",
  collageLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const postNewJobFormControls = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Company Name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Tilte",
    name: "title",
    placeholder: "Job title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Job type",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Job location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Job description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Required skills",
    componentType: "input",
  },
];

export const postNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const filterMenuDataArray = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export function formUrlQuery({ params, dataToAdd }) {
  let currentUrl = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentUrl[key];
      else currentUrl[key] = dataToAdd[key].join(",");
    });
  }

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  }, { skipNull: true });
}
