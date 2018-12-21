import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'form', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Forms/models/form.js').default) });
app.model({ namespace: 'booklist', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/bookshop/models/booklist.js').default) });
app.model({ namespace: 'rule', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'profile', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Profile/models/profile.js').default) });
app.model({ namespace: 'error', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('C:/Users/user/Desktop/实训一作业/antd pro/antd_pro/src/pages/Account/Settings/models/geographic.js').default) });
