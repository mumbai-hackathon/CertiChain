# CertiChain

## Problem Statement
Right now, there are many ways of creating forge certificates with the desired scores. This reduces the significance of the certificate and authenticity of the certificates is difficult to be proved. Hence there is a need for creating a system for generating certificates and proving its authenticity to the parties concerned.

## Solution
1. The admin registers the account of all faculty and The placement officer (TPO). Pnce the account is regsitered, the person gets and email of username and password.
2. The faculty-in-charge registers an event and requests generation of certificates for the students who have participated. The generation of certificates will require 2 levels of verification, ie. 1. To the Head of the Department(HOD) 2. To the Principal
3. The faculty sends names of the students in a csv file to the to higher level (to the HOD)
4. The HOD receives the names of the student on the Web UI, where he can accept, accept partial or reject the request. If the request is accepted, the request in CSV format goes to the principal, else it will be reverted back to the faculty-in-charge to modify the form.
5. When the request is accepted by the Principal, the certificates will be generated and stored in the file system of the server and the locations of the certificates will be stored into the database.
6. The student will be able to view his certificates through android application.
7. During placement process, the recruiter will be sent a csv file of students appearing for the placements by the placement officer, from which the recruiter can request granting access to the certificates from the students.
8. On receiving notification, the student can accept or deny the request.

## Technology Stack
1. Android
2. Website FrontEnd : 
  a. HTML
  b. CSS
  c. Bootstrap
  d. Javascript
  
3. Server:
  a. NodeJS
  

