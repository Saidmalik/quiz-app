import classes from './QuizCreator.module.css';
import { Button } from '../../components/UI/Button/Button';
import { useState } from 'react';
import {
  createControl,
  validate,
  validateForm,
} from '../../form/FormFrameWork';
import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import {
  createQuizQuestion,
  finishCreateQuiz,
} from '../../redux/actions/create';

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Варианты вопросов не могут быть пустыми',
      id: number,
    },
    { required: true }
  );
};
const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

const QuizCreator = (props) => {
  const [formControls, setFormControls] = useState(createFormControls());
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
  };
  const addQuestionHandler = (event) => {
    event.preventDefault();

    const { question, option1, option2, option3, option4 } = formControls;

    console.log(question, question.value);

    const questionItem = {
      question: question.value,
      id: props.quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    props.createQuizQuestion(questionItem);

    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());
  };
  const createQuizHandler = (event) => {
    event.preventDefault();

    setFormControls(createFormControls());
    setRightAnswerId(1);
    setIsFormValid(false);

    props.finishCreateQuiz();
  };

  const changeHandler = (value, controlName) => {
    const formControlsCopy = { ...formControls };
    const controlCopy = { ...formControlsCopy[controlName] };

    controlCopy.touched = true;
    controlCopy.value = value;
    controlCopy.valid = validate(controlCopy.value, controlCopy.validation);

    formControlsCopy[controlName] = controlCopy;

    setFormControls(formControlsCopy);
    setIsFormValid(validateForm(formControlsCopy));
  };
  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <>
          <Input
            key={controlName + index}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation} //!! - приведение к boolean типу
            onChange={(event) => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </>
      );
    });
  };
  const selectChangeHandler = (event) => {
    setRightAnswerId(Number(event.target.value));
  };

  const select = (
    <Select
      value={rightAnswerId}
      label='Выберите правильный ответ'
      onChange={selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />
  );

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        <form onSubmit={submitHandler}>
          {renderControls()}
          {select}
          <Button
            type='primary'
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type='success'
            onClick={createQuizHandler}
            disabled={props.quiz.length === 0}
          >
            Создать Тест
          </Button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);