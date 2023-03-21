import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import  Swal  from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private authService:AuthService) { }

  loginForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required]],
    email: ['test1@test.com',[ Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
    
  });


  ngOnInit(): void {
  }

  registrar(){
    const { email, password, name } = this.loginForm.value;
     
    console.log(this.loginForm.value);

    this.authService.registrarNuevoUsuario(email, password, name).subscribe( ok =>{
   console.log(ok);
      if(ok == true){

        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error', ok, 'error' )
      }
      
    }) 
   
  }
}
