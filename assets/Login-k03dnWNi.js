import{u,a as p,r as o,j as s,B as x}from"./index-oGnnmDLk.js";import{P as h}from"./PageNav-CflhHrcZ.js";import"./Logo-1GscDY0-.js";const f="_login_1mydq_1",g="_form_1mydq_8",j="_row_1mydq_22",a={login:f,form:g,row:j};function _(){const i=u(),{login:l,isAuthenticate:n}=p(),[t,m]=o.useState("jack@example.com"),[r,c]=o.useState("qwerty"),d=e=>{e.preventDefault(),!(!t||!r)&&l(t,r)};return o.useEffect(()=>{n&&i("/app",{replace:!0})},[n,i]),s.jsxs("main",{className:a.login,children:[s.jsx(h,{}),s.jsxs("form",{className:a.form,onSubmit:d,children:[s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"email",children:"Email address"}),s.jsx("input",{type:"email",id:"email",onChange:e=>m(e.target.value),value:t})]}),s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx("input",{type:"password",id:"password",onChange:e=>c(e.target.value),value:r})]}),s.jsx("div",{children:s.jsx(x,{type:"primary",children:"Login"})})]})]})}export{_ as default};
