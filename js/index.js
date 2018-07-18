// // 初始化组件---start----
new Vue({
  data() {
    return {
      username: null,
      password: null,
      tex:null,
      showpsd:'password',
      checked:false,
      checked2:false,
    }
  },
  el: '#app',
  components: {},
  methods: {
    // 用户名输入框失去焦点---start---
    uesenamefocus(){
      if(this.username){
        let prefixUser = this.username.slice(0,2);
        if(prefixUser=='YS'||prefixUser=='yS'||prefixUser=='ys'||prefixUser=='Ys'){
            this.username=this.username.toUpperCase()
        }else{
          this.username= 'YS' + this.username.toUpperCase()
        }
      }

    },
    // 用户名输入框失去焦点---end---
    // 登录---start---
    btnLogin() {
      let userReg = /^[a-zA-Z0-9]{4,12}$/;
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      if (this.username == null || this.username == '') {
        this.tex = "用户名不得为空!";
      } else if (this.password == null || this.password == '') {
        this.tex = "密码不得为空!";
      } else {
        if (!userReg.test(this.username)) {
          this.tex = "请检查您输入的用户名~";
        } else if (!pwdReg.test(this.password)) {
          this.tex = "请检查您输入的密码~";
        } else {
          network('https://www.ya3.com/index/mgLogin ', {
            username:this.username,
            password: this.password,
          }, data => {
            this.tex = data.message
            if (data.responseText) {
              if(this.checked2==true){
                window.localStorage.setItem('CHOSE_KEY',true)
                window.localStorage.setItem('USERNAME_KEY',this.username)
                window.localStorage.setItem('PSW_KEY',this.password)
              }
              location.href=data.responseText
            }
          })
        }
      }
    },
    // 登录---end---
   showpassword(){
       if(!this.checked==true){
          this.showpsd='text'
       }else{
         this.showpsd='password'
       }
   },
 },
  mounted() {
    if(window.localStorage.getItem('CHOSE_KEY')){
      this.username=window.localStorage.getItem('USERNAME_KEY')
      this.password=window.localStorage.getItem('PSW_KEY')
    }
 },
})
// // 初始化组件---end----

function network(url, data,fun) {
  if (!data) {
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(data) {
        fun(data)
      },
      error: function(data) {
        fun(data)
      }
    });
  } else {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      headers:{
        'X-Requested-With':'XMLHttpRequest'
      },
      ContentType: "application/x-www-form-urlencoded",
      dataType: "json",
      success: function(data) {
        fun(data)
      },
      error: function(data) {
        fun(data)
      }
    });
  }


}
