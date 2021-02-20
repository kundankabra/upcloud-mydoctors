import axios from "axios";
// https://project31-heroku.herokuapp.com/api/v11/user/alldoctors
// https://project31-heroku.herokuapp.com/api/v11/user/doctorprofile/?id=5fb8f520c063b50024f1757b

export const getAutoComplete = async (id) => {
  if (id === null){
    return null
  }
  return await axios
  .post('https://project31-heroku.herokuapp.com/api/v11/user/search/autoComplete/',{
    keyword: id
  })
  .then((response)=> {
    console.log(response.data)
    return response.data
  })
  .catch((error)=> {
    console.log(error);
});
};


// export const getDoctorSearch = async (id) => {
//   return await axios
//   .post('https://project31-heroku.herokuapp.com/api/v11/user/search/',{
//     keyword: id
//   })
//   .then((response)=> {
//     return response
//     console.log(response);
//   })
//   .catch((error)=> {
//     console.log(error);
// });
// };
