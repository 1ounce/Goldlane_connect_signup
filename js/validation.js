

 //Validation Check
		$("#validaion_err_name").hide();
		$("#validaion_err_email").hide();
		$("#validaion_err_cpmname").hide();
		$("#validaion_err_address").hide();
		$("#validaion_err_pwd1").hide()
		$("#validaion_err_pwd2").hide()
		$("#pwd_tick_icon").hide()



		$("#username").focusout(function(){
            
            var fname = $("#username").val().length;
            if (fname <=0) {
				$("#validaion_err_name").show();

            } else {
				$("#validaion_err_name").hide();
		
            }
		 });
		 
		 $("#email").focusout(function(){
            var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            var email = $("#email").val();
            if (pattern.test(email) && email !== '') {
				$("#validaion_err_email").hide();
            } else {
				$("#validaion_err_email").show();
            
              
			}
		})

		$("#pass1").focusout(function(){
            var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            var pass1 = $("#pass1").val();
            if (pattern.test(pass1) && pass1 !== '') {
				$("#validaion_err_pwd1").hide();
            } else {
				$("#validaion_err_pwd1").show();
            
              
			}
		})



		$("#pass2").focusout(function(){
			var password = $("#pass1").val();
            var retype_password = $("#pass2").val();
            if (password !== retype_password) {
				$("#validaion_err_pwd2").show()
				$("#pwd_tick_icon").hide()
            } else {
				$("#validaion_err_pwd2").hide()
				$("#pwd_tick_icon").show()

			}
		})

		$("#phn").focusout(function() {
			 var pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
			var phnno = $("#phn").val();
			if(!pattern.test(phnno)){
				$("#cerr").show();
				document.getElementById("send_otp").disabled = true;
			}

		})

		$("#company_name").focusout(function() {
			var len = $("#company_name").val().length
			if(len<=0){
				$("#validaion_err_cpmname").show();
			}else {
				$("#validaion_err_cpmname").hide();
			}

		})

		$("#address").focusout(function() {
			var len = $("#address").val().length
			if(len<=0){
				$("#validaion_err_address").show();
			} else {
				$("#validaion_err_address").hide();
			}

		})




