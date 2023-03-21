import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import  Swal  from 'sweetalert2'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private autService: AuthService) {}

  loginForm: FormGroup = this.fb.group({
    email: ['test9@tes1.com',[ Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
    
  });

  ngOnInit(): void {}

  login(){

    // this.autService.validarToken().subscribe(res => console.log(res));
   
    console.log(this.loginForm.value);

    const { email, password } = this.loginForm.value;
   

    this.autService.login(email, password).subscribe( ok =>{
   console.log(ok);
      if(ok == true){
        this.loginForm.reset();
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error', ok, 'error' )
      }
      
    }) 

  }
}
