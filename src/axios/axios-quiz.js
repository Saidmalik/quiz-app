import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-f6e79-default-rtdb.firebaseio.com',
});
