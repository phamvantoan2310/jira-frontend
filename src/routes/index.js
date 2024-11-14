import { CreateProjectPage } from '../pages/CreateProjectPage/CreateProjectPage';
import { CreateTaskPage } from '../pages/CreateTaskPage/CreateTaskPage';
import { DetailProjectPage } from '../pages/DetailProject/DetailProjectPage';
import { DetailTaskPage } from '../pages/DetailTask/DetailTaskPage';
import {UserDetailPage} from '../pages/UserDetailPage/UserDetailPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage';
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage';


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/loginPage',
        page: LoginPage,
        isShowHeader: true
    },
    {
        path: '/registerPage',
        page: RegisterPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
    {
        path: '/project/:IdProject',
        page: DetailProjectPage,
        isShowHeader: true
    },
    {
        path: '/task/:IdTask',
        page: DetailTaskPage,
        isShowHeader: true
    },
    {
        path: '/task/createtask',
        page: CreateTaskPage,
        isShowHeader: true
    },
    {
        path: '/project/createproject',
        page: CreateProjectPage,
        isShowHeader: true
    },
    {
        path: '/user/userdetail',
        page: UserDetailPage,
        isShowHeader: true
    },
    {
        path: '/forgotpassword',
        page: ForgotPasswordPage,
        isShowHeader: true
    },
    {
        path: '/changepassword/:email',
        page: ChangePasswordPage,
        isShowHeader: true
    }
]
