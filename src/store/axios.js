import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api'
});

const errorHandler = (error) => {

	if(error.response) {
		let message = error.response.data.message ? error.response.data.message : error.response.data;
		console.error(message)
	}

  return Promise.reject({ ...error })
}

const successHandler = (response) => {
	
  return response
}

axios.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

export default axios;