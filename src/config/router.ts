
//定义路由组件：
import IndexPage from '../pages/Index.Vue'
import TeampPage from '../pages/Teampage.Vue'
import UserPage from '../pages/UserPage.Vue'
import SearchUserPage from '../pages/SearchUserPage.Vue'
import UserEditPage from '../pages/UserEditPage.Vue'
import SearchResultPage from '../pages/SearchResultPage.Vue'
import UserRegisterPage from '../pages/UserRegisterPage.Vue'
import UserLoginPage from '../pages/UserLoginPage.Vue'
import TeamAddPage from '../pages/TeamAddPage.Vue'
import TeamUpdatePage from '../pages/TeamUpdatePage.Vue'
import UserUpdatePage from '../pages/UserUpdatePage.Vue'
import MyJoinTeamPage from '../pages/MyJoinTeamPage.Vue'
import MyCreateTeamPage from '../pages/MyCreateTeamPage.Vue'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/',component: IndexPage },
    { path: '/team',title:'队伍页', component: TeampPage },
    { path: '/user',title:'个人页', component: UserPage },
    { path: '/search',title:'查找用户页', component: SearchUserPage },
    { path: '/user/login',title:'用户登录页', component: UserLoginPage },
    { path: '/user/register',title:'用户注册页', component: UserRegisterPage },
    { path: '/user/update', title:'用户信息更新页',component: UserUpdatePage },
    { path: '/user/edit', title:'用户信息编辑页',component: UserEditPage },
    { path: '/user/list', title:'用户列表页',component: SearchResultPage },
    { path: '/team/add',title:'队伍添加页', component: TeamAddPage },
    { path: '/team/update', title:'队伍更新页',component: TeamUpdatePage },
    { path: '/user/team/join',title:'我加入的队伍', component: MyJoinTeamPage },
    { path: '/user/team/create', title:'我创建的队伍',component: MyCreateTeamPage },
]


export default routes; //导出路由