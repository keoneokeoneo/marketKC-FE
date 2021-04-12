import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식을 맞춰주세요')
    .required('필수 입력 항목입니다'),
  password: yup.string().required('필수 입력 항목입니다'),
});

export const SignUpSchema = yup.object().shape({
  name: yup.string().required('필수 입력 항목입니다'),
  email: yup
    .string()
    .email('이메일 형식을 맞춰주세요')
    .required('필수 입력 항목입니다'),
  password: yup
    .string()
    .required('필수 입력 항목입니다')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#^&])[A-Za-z\d@$!%*?#^&]{8,}$/,
      '대/소문자, 숫자, 특수문자가 포함된 8자 이상',
    ),
  confirmPassword: yup
    .string()
    .required('필수 입력 항목입니다')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
});
