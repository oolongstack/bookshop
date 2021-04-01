import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Swipe, SwipeItem , PullRefresh, 
    Lazyload,Sidebar, SidebarItem,
     Collapse, CollapseItem ,Tab, Tabs,Card,
     Image as VanImage,Tag,Button, Form,Field ,Badge,CheckboxGroup,Checkbox,SwipeCell
    ,Stepper,SubmitBar,Icon,AddressEdit,AddressList} from 'vant';

import 'vant/lib/index.css';

const app = createApp(App)
app.use(store)
app.use(router).mount('#app')

app.use(Swipe);
app.use(SwipeItem);
app.use(PullRefresh);
app.use(Lazyload,{
    loading:require('./assets/img/default.png')
})
app.use(Sidebar)
app.use(SidebarItem)
app.use(Collapse);
app.use(CollapseItem);
app.use(Tab);
app.use(Tabs);
app.use(Card);
app.use(VanImage)
app.use(Tag)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(Badge)
app.use(CheckboxGroup)
app.use(SwipeCell)
app.use(Checkbox)
app.use(Stepper)
app.use(SubmitBar)
app.use(Icon)
app.use(AddressEdit)
app.use(AddressList)


