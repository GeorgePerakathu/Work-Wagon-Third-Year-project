import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./responsive.css";
import Navbar from "./Navbar";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseapp.js";

const ProfileForm = () => {
  const [addData, setAddData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    bio: "",
    interests: "",
    languages: [],
    jobtype:"",
    socialMedia: "",
    title: "",
    description: "",
    profileImage: "",
    cardImage: [],
    skills: [{ skill: "", experience: "Beginner" }],
    education: [{ institution: "", yearOfPassing: "" }],
    projects: [
      {
        title: "",
        description: "",
        githubLink: "",
        liveDemoLink: "",
        image: "",
        photoDescription: "",
      },
    ],
    projectPlans: [
      { name: "Basic", description: "", cost: "" },
      { name: "Intermediate", description: "", cost: "" },
      { name: "Advanced", description: "", cost: "" },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await customFetch.get("/Update");
      console.log("Fetched data:", response.data);
      const data = response.data[0];
      setFormData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleImageChange = async (e) => {
    try {
      const imageFile = e.target.files[0];
      const timestamp = new Date().getTime();
      const uniqueFileName = `${timestamp}-${Math.floor(
        Math.random() * 1000000
      )}`;

      const storageRef = ref(storage, `profileimg`);
      const imageRef = ref(storageRef, uniqueFileName);

      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      setProfileImage(imageUrl);
      setFormData({
        ...formData,
        profileImage: imageUrl,
      });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      toast.error("Image upload failed");
    }
  };



const handleCardChange = async (e) => {
  try {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const timestamp = new Date().getTime();
      const uniqueFileName = `${timestamp}-${Math.floor(
        Math.random() * 1000000
      )}`;

      const storageRef = ref(storage, `images/${uniqueFileName}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      uploadedImages.push(imageUrl);
    }

    setFormData({
      ...formData,
      cardImage: uploadedImages,
    });

    toast.success("Images uploaded successfully");
  } catch (error) {
    console.error("Error uploading images to Firebase Storage:", error);
    toast.error("Image upload failed");
  }
};

  /*
  const handleCardChange = async (e) => {
    const imagesFiles = Array.from(e.target.files);

    try {
      const urls = await Promise.all(
        imagesFiles.map(async (imageFile, index) => {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}${index}`;

          const storageRef = ref(storage, `profileimg`);
          const imageRef = ref(storageRef, uniqueFileName);

          await uploadBytes(imageRef, imageFile);
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        })
      );

      setProfileImage(urls);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images to Firebase Storage:", error);
      toast.error("Image upload failed");
    }
  };
*/

  const handleEditClick = async () => {
    try {
      await fetchData(); 
      setProfileImage(formData.profileImage);
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };
  const handleSaveSubmit = async () => {
    try {
      const response = await customFetch.put("/Save", formData);
      console.log("Updated data:", response.data);
      toast.success("Update successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle errors, display a message, etc.
    }
  };
  const handleProjectImageChange = (index, e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index].image = event.target.result;
        setFormData({
          ...formData,
          projects: updatedProjects,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...formData.projectPlans];
    updatedPlans[index][field] = value;
    setFormData({
      ...formData,
      projectPlans: updatedPlans,
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.projects];
    updatedProjects.splice(index, 1);
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const removeEducationField = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const experienceOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Master", label: "Master" },
  ];

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLanguagesChange = (selectedOptions) => {
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      languages: selectedLanguages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use axios for making the API request
      const response = await customFetch.post("/Update", formData);

      // Check the response and handle accordingly
      console.log("Server response:", response.data);
      toast.success("Update successfully");
      // Redirect or perform other actions as needed
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle errors, display a message, etc.
    }
  };



  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill: "", experience: "Beginner" }],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
  ];

  const jobOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "App Development", label: "App Development" },
    { value: "Photography", label: "Photography" },
    // Add more occupation options as needed
  ];

 /* const handleOccupationChange = (selectedOptions) => {
    const selectedOccupations = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      occupation: selectedOccupations,
    });
  };*/
  const handlejobtype = (selectedOption) => {
    const selectedJobType = selectedOption.value;
    setFormData({
      ...formData,
      jobtype: selectedJobType,
    });
  };
  
  const addEducationField = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", yearOfPassing: "" },
      ],
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="flex flex-col items-center justify-center pb-10  ">
          <div className="hid">
            <h1 className="text-2xl font-semibold mt-6">Profile Info</h1>
          </div>
          <div
            className="bg-blue-500  text-black p-12 rounded shadow-lg "
            style={{ backgroundColor: "#0F4C75" }}
            id="fi-over"
          >
            <div>
              <div className="fi-name">
                <div className="flex space-x-4 mb-4" id="fi-name">
                  <label className="text-2xl font-semibold pl-3 pr-14 text-white ">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="bg-white text-black border-0 rounded-md p-2 w-1/2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 sm:mx-auto sm:w-1/2"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="bg-white text-black border-0 rounded-md p-2 w-1/2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  />
                </div>
              </div>
              <div className="container mx-auto p-4 py-16 flex" id="fi-p">
                <h1 className="text-2xl font-semibold mt-8 text-white">
                  Profile Photo:
                </h1>
                <label className="bg-white p-6 rounded-full h-40 w-40 mx-auto border border-gray-300 flex items-center justify-center cursor-pointer">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-full h-32 w-32 object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xl">
                      <FontAwesomeIcon icon={faCamera} />
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="flex py-16" id="fi-bio">
                <label className="text-2xl font-semibold pt-4 pl-3 pr-32 text-white">
                  Bio:
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  id="fi-bio"
                  className="bg-white text-black border-0 rounded-md p-8 w-1/2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
                />
              </div>
              <div className="flex py-16" id="fi-lang">
                <label className="text-2xl font-semibold pt-4 pl-2 pr-10 text-white">
                  Languages:
                </label>
                <Select
                  isMulti
                  name="languages"
                  options={languageOptions}
                  onChange={handleLanguagesChange}
                  className="bg-white text-black rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />

                <label className="text-2xl font-semibold pl-12 pt-4 pr-8 text-white">
                  Mobile:
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="fi-mob"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="bg-white text-black border-0 rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />
              </div>
              <div className="flex py-16" id="fi-lang">
                <label className="text-2xl font-semibold pl-12 pt-4 pr-8 text-white">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="bg-white text-black border-0 rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />

                <label className="text-2xl font-semibold pl-12 pt-4 pr-8 text-white">
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  //id="fi-mob"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="bg-white text-black border-0 rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />
              </div>
            </div>

            <div>
              
              {/* Skill section */}
              <div className="flex py-4" id="fi-skill">
                <label className="text-2xl font-semibold pt-4 pl-2 pr-8 text-white">
                  Skills:
                </label>
                <div className="w-full ml-20 " id="fi-skill-1">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="mb-2 flex">
                      <input
                        type="text"
                        name="skill"
                        placeholder="Skill"
                        value={skill.skill}
                        onChange={(e) =>
                          handleSkillChange(index, "skill", e.target.value)
                        }
                        className="bg-white text-black border-0 rounded-md p-2 w-full mr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                      <Select
                        name="experience"
                        options={experienceOptions}
                        value={experienceOptions.find(
                          (option) => option.value === skill.experience
                        )}
                        onChange={(selectedOption) =>
                          handleSkillChange(
                            index,
                            "experience",
                            selectedOption.value
                          )
                        }
                        className="bg-white text-black border-0 rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                      {index > 0 && (
                        <button
                          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                          onClick={() => removeSkill(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    onClick={addSkill}
                  >
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="flex py-16" id="fi-int">
                <label className="text-2xl font-semibold pt-4 pl-2 pr-16 text-white">
                  Interests:
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="bg-white text-black border-0 rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />
              </div>
              {/* Education section */}
              <div className="flex py-4" id="fi-edu">
                <label className="text-2xl font-semibold pt-4 pl-2 pr-12 text-white">
                  Education:
                </label>
                <div className="w-full  text-black">
                  {formData.education.map((education, index) => (
                    <div key={index} className="mb-2 flex">
                      <div className="relative flex " id="fi-edu-1">
                        <input
                          type="text"
                          name="institution"
                          placeholder="Institution"
                          value={education.institution}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          className="bg-white text-black border-0 rounded-md p-2 w-full pr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        />
                        <span className="pl-5"></span>
                        <input
                          type="text"
                          name="yearOfPassing"
                          placeholder="Year of Passing"
                          value={education.yearOfPassing}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "yearOfPassing",
                              e.target.value
                            )
                          }
                          className="bg-white text-black border-0 rounded-md p-2  w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        />
                        <input
                          type="text"
                          name="yearOfPassing"
                          placeholder="Branch"
                          value={education.yearOfPassing}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "yearOfPassing",
                              e.target.value
                            )
                          }
                          className="bg-white text-black border-0 rounded-md p-2 ml-5 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        />{" "}
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => removeEducationField(index)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    onClick={addEducationField}
                  >
                    Add Education
                  </button>
                </div>
              </div>
              <div className="flex py-16" id="fi-occ">
  <label className="text-2xl font-semibold pt-4 pl-2 pr-8 text-white">
    Job Type:
  </label>
  <Select
    name="jobtype"
    options={jobOptions}
    onChange={handlejobtype} // Changed onClick to onChange
    className="bg-white text-black border-0 rounded-md p-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
  />
</div>
              <div className="flex py-16" id="fi-sm">
                <label className="text-2xl font-semibold pt-4 pl-2 text-white">
                  Social Media:
                </label>
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  placeholder="Add a link to your social media"
                  className="bg-white text-black border-0 rounded-md p-2 w-full h-16 mt-5 ml-12 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />
              </div>
            </div>
            <div className="flex py-4" id="fi-projects">
              <label className="text-2xl font-semibold pt-4 pl-2 pr-8 text-white">
                Projects:
              </label>
              <div className="w-full ml-18" id="fi-projects-1">
                {formData.projects.map((project, index) => (
                  <div key={index} className="mb-2 ">
                    <div className="flex pb-5">
                      <input
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) =>
                          handleProjectChange(index, "title", e.target.value)
                        }
                        className="bg-white text-black border-0 rounded-md p-5 w-full mr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                      <input
                        type="text"
                        name="description"
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="bg-white text-black border-0 rounded-md p-5 w-full mr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                    </div>
                    <div className="flex pb-5">
                      <input
                        type="text"
                        name="githubLink"
                        placeholder="GitHub Link"
                        value={project.githubLink}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "githubLink",
                            e.target.value
                          )
                        }
                        className="bg-white text-black border-0 rounded-md p-5 w-full mr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                      <input
                        type="text"
                        name="liveDemoLink"
                        placeholder="Live Demo Link"
                        value={project.liveDemoLink}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "liveDemoLink",
                            e.target.value
                          )
                        }
                        className="bg-white text-black border-0 rounded-md p-5 w-full mr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                    </div>
                    <div className="flex pb-5 items-center">
                      <label
                        htmlFor={`projectImageInput-${index}`}
                        className="relative w-[600px] h-[200px] rounded-md overflow-hidden mr-5 cursor-pointer"
                      >
                        <img
                          src={project.image}
                          alt="Project Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm">
                          Change Image
                        </div>
                        <input
                          id={`projectImageInput-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProjectImageChange(index, e)}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        name="photoDescription"
                        placeholder="Photo Description"
                        value={project.photoDescription}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "photoDescription",
                            e.target.value
                          )
                        }
                        className="bg-white text-black border-0 rounded-md p-5 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      />
                    </div>
                   
                  </div>
                ))}
                <button
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      projects: [
                        ...formData.projects,
                        {
                          title: "",
                          description: "",
                          githubLink: "",
                          liveDemoLink: "",
                          image: "",
                          photoDescription: "",
                        },
                      ],
                    })
                  }
                >
                  Add Project
                </button>
              </div>
            </div>
            <div className="flex py-4" id="fi-plans">
              <label className="text-2xl font-semibold pt-4 pl-2 pr-8 text-white">
                Project Plans:
              </label>
              <div className="w-full ml-18" id="fi-plans-1">
                {formData.projectPlans.map((plan, index) => (
                  <div key={index} className="mb-2 flex">
                    <input
                      type="text"
                      name={`planName-${index}`}
                      placeholder={`Plan ${plan.name} Name`}
                      value={plan.name}
                      readOnly
                      className="bg-white text-black border-0 rounded-md p-2 w-min mr-5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    />
                    <textarea
                      name={`planDescription-${index}`}
                      placeholder={`Plan ${plan.name} Description`}
                      value={plan.description}
                      onChange={(e) =>
                        handlePlanChange(index, "description", e.target.value)
                      }
                      className="bg-white text-black border-0 rounded-md p-2 mr-2 w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    />
                    <input
                      type="number"
                      name={`planCost-${index}`}
                      placeholder={`Plan ${plan.name} Cost`}
                      value={plan.cost}
                      onChange={(e) =>
                        handlePlanChange(index, "cost", e.target.value)
                      }
                      className="bg-white text-black border-0 rounded-md p-2  w-min focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                onChange={handleCardChange}
                style={{ display: "none" }}
              />
              <button
                onClick={() => document.getElementById("imageUpload").click()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload Card Images
              </button>
            </div>
            <div class="flex justify-center">
              <div class="flex items-center">
                <button
                  class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 mr-2 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                  onClick={handleEditClick}
                >
                  Edit
                </button>

                <button
                  class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                  onClick={handleSaveSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div class="flex justify-center">
              <button
                class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};


export default ProfileForm;
