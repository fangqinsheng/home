// (function(){
//   // 手机号码
//   $.validator.addMethod("mobile", function (value, element) {
//     var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
//     return this.optional(element) || reg.test(value);
//   },"请输入正确手机号码");
//
//   // 中文字两个字节
//   $.validator.addMethod("byteRangeLength", function(value, element, param) {
//     var length = value.length;
//     for(var i = 0; i < value.length; i++){
//       if(value.charCodeAt(i) > 127){
//         length++;
//       }
//     }
//     return this.optional(element) || ( length >= param[0] && length <= param[1] );
//   }, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));
//
//   // 邮政编码验证
//   $.validator.addMethod("isZipCode", function(value, element) {
//     var tel = /^[0-9]{6}$/;
//     return this.optional(element) || (tel.test(value));
//   }, "请正确填写您的邮政编码");
//
//   $("#registered-btn").validate({
//     rules: {
//       loginName: "",
//       password: "",
//       checkPassword: "",
//       name: "",
//       mobile: "",
//       valid: "",
//       radio: "required"
//     },
//     message: {
//       loginName: "请输入用户名",
//       password: "请输入密码",
//       checkPassword: {
//         required: "再次输入密码",
//         equalTo: "两次密码输入不一致"
//       },
//       name: {
//         required: "请输入用户名",
//         minlength: "用户名必需由两个字母组成"
//       },
//       mobile: {
//         required: "请输入手机号码",
//         number: "请输入有效的数字",
//         mobile: "请输入正确手机号码"
//       },
//       valid: "",
//       radio: "required"
//     }
//   })
// }());
