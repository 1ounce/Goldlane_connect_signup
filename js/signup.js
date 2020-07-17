
		$(document).ready(function() {

			 

              //FETCH THE PROFESSION LIST FROM PROFESSION API 
			 fetch(`${connect_ip}professionapi/`) 
				.then(function(res){
				return res.json()
				})
				.then(function(data){
					console.log(data)
					result(data)
				})
				.catch(function(err){
					console.log("Something Wrong With the api Call"+err)
				})
				function result(data){
					let options=" ";
					professions = data;
					for(let i=0;i<professions.results.length;i++){
					options += `<option value="${professions.results[i].id}">${professions.results[i].title}</option>`

				}
                    options += `<option value="other">Other</option>`
				    document.getElementById("profession").innerHTML = options;
				}


               //FETCH THE AREA STATE FROM THE PINCODE API
			   $("#pincode").on("input", function() {   
			   let inp= $("#pincode").val()
			   if(inp.length==6) {
				$('#animation').addClass('spinner-border text-warning');
				fetch(`${ip}common/pincode/${inp}/`)
				.then(function(res){
					$('#animation').removeClass('spinner-border text-warning');
				 return res.json()
				})
				.then(function(data){
					
				console.log(data)
				let options="";
				areas = data;
				for(let i=0;i<areas.results.length;i++){
				options += `<option value="${areas.results[i].id}">${areas.results[i].area}</option>`
			   
				}
			   document.getElementById("area").innerHTML = options;
			   document.getElementById("state").value = `${areas.results[0].state}`;
			   document.getElementById("district").value = `${areas.results[0].district}`;
			
				})
				.catch(function(err){
					alert("Please Enter Valid Pin Code")
				})
			} 
			})

            //OTP FIELDS WILL HIDEN FIRST 
			$("#otp_field").hide()
		    $("#send_otp").click(function(){
			$("#otp_field").show()
		    })

            //ENABLES OTP BUTTON WHEN INPUT IS 10
		    document.getElementById("send_otp").disabled = true;
		    $("#phn").on("input", function() {
			let inp= $("#phn").val()
			if(inp.length==10){
				document.getElementById("send_otp").disabled = false;
				$("#send_otp").css("background-color", "red");
			} else {
				document.getElementById("send_otp").disabled = true;
			}

		   })


            //DISABLES RESEND OTP AND ENABLES AFTER 60SEC
		    $("#send_otp").click(function() {
					$("#send_otp").hide()
					$("#resendotp_field").hide()
					var seconds = 30;
	                var countdown = setInterval(function() {
	                seconds--;
	                document.getElementById("countdown").textContent = seconds;
	                if (seconds <= 0) {
						clearInterval(countdown);
						$("#resendotp_field").show()
				        $("#un").hide()

						}
	             }, 1000);

					
				})
            
            //DISABLES THE SUBMITTING FORM BY ENTER KEY
		    $(window).keydown(function(event){
		    if(event.keyCode == 13) {
		    event.preventDefault();
		    return false;
		    }
	         });

            //FOCUS TO NEXT OTP INPUT FIELD
		    
	           // $(".j").on("keypress", function(e){
            //       $(this).next().trigger("focus");
	       

           //SHOWS THE PASSWORD INPUT FIELD VALUE 
           $(document).on('click', '.toggle-password', function() {
           $(this).toggleClass("fa-eye fa-eye-slash");
           var input = $("#pass2,#pass1");
           input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
           });

            //CHECKS IF ALL FIELDS ARE FILLED
	        document.getElementById("proceed2").disabled = true;
			$("#username,#email,#company_name,#pincode,#address").on("input", function() {
		    var name = $("#username").val().length;
			var email = $("#email").val().length;
			var company_name = $("#company_name").val().length;
			var pincode = $("#pincode").val().length;
			var address = $("#address").val().length;
			// var pass1 = $("#pass1").val().length;
			// var pass2 = $("#pass2").val().length;
	        
		
			if(name<=0 || email<=0 || company_name<=0 || pincode<=0 ||address<=0){
				document.getElementById("proceed2").disabled = true;
			 } else{
				document.getElementById("proceed2").disabled = false;
			 }
			})

			$("#invalid_details").hide()

            //PRESS ENTER TO BUTTON CLICK FUNCTIONALITY
			$("#user_password").keyup(function(event) {
			  if (event.keyCode === 13) {
			     $("#login_check").click();
			    }
			});

			$("#phn").keyup(function(event) {
			    if (event.keyCode === 13) {
			        $("#check_mobile_no").click();
			    }
			});

			

           
            //IF COMPANY NAME IS NEEDED ENABLE THE COMPANY NAME FIELD
			$('#company_name').on('change',function(){
			    if($(this).val()==="0"){
			    $("#show_company_input").show()
			    }
			    else{
			    $("#show_company_input").hide()
			    }
			});


			$('#profession').on('change',function(){
			    if($(this).val()==="other"){
			    $("#show_profession_input").show()
			    }
			    else{
			    $("#show_profession_input").hide()
			    }
			});

			$("#user_password").focusin(function() {
				$("#invalid_details").hide()
			})
			$("#phn").focusin(function() {
				$("#check_valid_no").hide()
			})

			$("#inp_otp1,#inp_otp2,#inp_otp3,#inp_otp4").focusin(function() {
				$("#otp_err").hide();
			})

            
            //CHECKS BY NUMBER IF USER REGISTERED OR NOT 
			$("#check_mobile_no").on("click", function() {
			
			let inp = document.getElementById("phn").value;
			if(inp.length==10){
				$('#load_icon').addClass('spinner-border text-warning');
				$("#check_mobile_no").hide()
			   
				$.post(`${connect_ip}checkPhone/`, { phone:inp } ,function(data){
					$('#load_icon').removeClass('spinner-border text-warning');
				let res = data
				if(res.code==2) {
					$("#send_otp").css("display","inline")
				} else {
					$("#send_otp").hide()
				}

				if(res.code==3){
					$("#reguser").show()

				} else {
					$("#reguser").hide()
				}
				
				
        });
			} else {
				$("#check_valid_no").css("display","block")
			}
		})

			$("#otp_err").hide();


		$("#resendOtp").on("click", function() {
			$("#otp_resend").show() 
			$("#resendOtp").hide()
			$("#or,#callNow").hide()
			$("#callNow").hide() 


			        var seconds = 30;
	                var countdown = setInterval(function() {
	                seconds--;
	                document.getElementById("countdown1").textContent = seconds;
	                if (seconds <= 0) {
						clearInterval(countdown);
						$("#otp_resend").hide() 
						$("#resendOtp").show()
			            $("#or,#callNow").show()
						}
	             }, 1000);






		})

		$("#callNow").on("click", function() {
			$("#callNow").hide()
			$("#or,#callNow").hide()
			$("#otp_resend").show() 
			$("#resendOtp").hide() 


			        var seconds = 30;
	                var countdown = setInterval(function() {
	                seconds--;
	                document.getElementById("countdown1").textContent = seconds;
	                if (seconds <= 0) {
						clearInterval(countdown);
						$("#otp_resend").hide() 
						$("#resendOtp").show()
			            $("#or,#callNow").show()
						
						}
	             }, 1000);


		})



			 


	

		})




//CHECKS FOR CORRECT PASSWORD AND AUTO FILLS THE DATA
function checkpass() {
        
		$('#load_icon1').addClass('spinner-border text-light');
		let phn = document.getElementById("phn").value;
		let pass = document.getElementById("user_password").value;
		
		$.post(`${connect_ip}login/`, { username:phn,password:pass } ,function(data,status){
			$('#load_icon1').removeClass('spinner-border text-light');
           console.log(JSON.stringify(data));
           if(status=="success") {
			   document.getElementById("login_check").disabled = false;
			   document.getElementById("username").value = `${data.username}`;
			   document.getElementById("pincode").value = `${data.pincode}`;
			   document.getElementById("area").value = `${data.area}`;
			   document.getElementById("state").value = `${data.state}`;
			   $(".signup_step1").hide();
            	$(".signup_step2").show();
				$(".pass_hide").hide();

			let inp = data.pincode
			fetch(`${ip}common/pincode/${inp}/`)
			.then(function(res){
				
			 return res.json()
			})
			.then(function(data){
				
			
			let options="";
			areas = data;
			for(let i=0;i<areas.results.length;i++){
			options += `<option value="${areas.results[i].id}">${areas.results[i].area}</option>`
		   
			}
		   document.getElementById("area").innerHTML = options;
		   

			})
				
           }

        }).fail(function(data) {
			$('#load_icon1').removeClass('spinner-border text-light');
        	 console.log("error", data.status);
        	  if(data.status==500) {
			   $("#invalid_details").show()
			  
		   }
		   
		   
        })

		
	}




//AJAX POST REQUEST TO SUBMIT DATA TO THE SIGNUP API
        function finalData() {
        
	    let phone = document.getElementById("phn").value;
		let profession = document.getElementById("profession").value;
		if(profession=="other"){
			profession = document.getElementById("inp_profession").value;
		}
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let company_name = document.getElementById("company_name").value;
		if(company_name=="0"){
			company_name = document.getElementById("inp_company_name").value;
		}
		let address = document.getElementById("address").value;
		let pincode = document.getElementById("pincode").value;
		let pin_id = document.getElementById("area").value;
		let password = document.getElementById("pass1").value;
		if(password.length==" ") {
			password = document.getElementById("user_password").value;
		} 
		let title = document.getElementById("title").value;
		let work_description = document.getElementById("wrkdesp").value;
		let profile_image = document.getElementById("profile_image").files[0];
		let cover_image = document.getElementById("cover_image").files[0];
		let work_proof = document.getElementById("work_proff").files[0];
        
        console.log("phone:  "+phone)
		console.log("profession:  "+profession)
		console.log("username:  "+username)
		console.log("email:  "+email)
		console.log("company_name:  "+company_name)
		console.log("address:  "+address)
		console.log("pincode:  "+pincode)
		console.log("pin_id:  "+pin_id)
		console.log("password:  "+password)
		console.log("title:  "+title)
		console.log("work_description:  "+work_description)
		console.log("profile_image:  "+profile_image)
		console.log("cover_image:  "+cover_image)
		console.log("work_proof:  "+work_proof)

		var form = new FormData()
		form.append("phone",phone)
		form.append("profession",profession)
		form.append("username",username)
		form.append("email",email)
		form.append("company_name",company_name)
		form.append("address",address)
		form.append("pincode",pincode)
		form.append("pin_id",pin_id)
		form.append("password",password)
		form.append("title",title)
		form.append("work_description",work_description)
		form.append("profile_image",profile_image)
		form.append("cover_image",cover_image)
		form.append("work_proof",work_proof)


		$.ajax({
			url:`${connect_ip}signup/`,
			data:form,
			type:"POST",
			processData:false,
			contentType:false,
			success: function(response) {
				console.log(response)
				console.log("Data Saved Successfully")
			},
			error: function(response) {
                 alert("Fail")
           }
		})


	}


	function otp_send() {

		let mock = 1;
		let phone = document.getElementById("phn").value;
		
		$.post(`${connect_ip}register/sendOtp/`, { phone:phone,mock:mock} ,function(data,status){
			
           console.log(JSON.stringify(data));
       }).fail(function(data) {
       	if(data.status==500) {
       		console.log("Number already registered")
       	}

       })
	}


		function resend_otp() {
			let phone = document.getElementById("phn").value;
			let is_voice = 0
			$.post(`${connect_ip}register/retryOtp/`, { phone:phone,is_voice:is_voice } ,function(data,status){
				console.log(JSON.stringify(data));

			}).fail(function(data) {
	       	if(data.status==500) {
	       		console.log("Error sending OTP")
	       	}

	       })

		}

		function call() {
		let phone = document.getElementById("phn").value;
		let is_voice = 1
		$.post(`${connect_ip}register/retryOtp/`, { phone:phone,is_voice:is_voice } ,function(data,status){
			console.log(JSON.stringify(data));

		}).fail(function(data) {
       	if(data.status==500) {
       		console.log("Error in call")
       	}

       })

	}

	 function verify_otp(){
	 	$('#load_icon2').addClass('spinner-border text-light');
	 	let phone = document.getElementById("phn").value;
	 	let otp1  = document.getElementById("inp_otp1").value;
	 	let otp2  = document.getElementById("inp_otp2").value;
	 	let otp3  = document.getElementById("inp_otp3").value;
	 	let otp4  = document.getElementById("inp_otp4").value;
	 	let user_otp = otp1+otp2+otp3+otp4
		$.post(`${connect_ip}register/verifyOtp/`, { phone:phone,otp:user_otp } ,function(data,status){
			$('#load_icon2').removeClass('spinner-border text-light');
			console.log(JSON.stringify(data));
			 $(".signup_step2").show();
             $(".signup_step1").hide();
			
			
	 	}).fail(function(data){
			$('#load_icon2').removeClass('spinner-border text-light');
			$("#otp_err").show();
	 		if(data.status==500){
	 			console.log("Fail verifying OTP")
	 		}
	 	})






	 }




	


	
		

