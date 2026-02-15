import{r as l,j as e,b,c as h,d as x}from"./index-BEh614DA.js";import{m as f}from"./proxy-CQeXRy6w.js";const N=({onSubmit:a,onCancel:i})=>{const[r,c]=l.useState(""),[o,n]=l.useState(""),[t,d]=l.useState(null),[m,u]=l.useState(!1),p=s=>{s.preventDefault(),u(!0),a&&setTimeout(()=>{a({title:r,description:o,file:t})},2e3)};return m?e.jsxs(f.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},className:"text-center py-5",children:[e.jsx(b,{size:60,color:"#0d681c",className:"mb-3"}),e.jsx("h3",{className:"text-success",children:"Bug Reported Successfully!"}),e.jsx("p",{className:"text-muted",children:"Thank you for helping us improve AlgoLens."})]}):e.jsxs("form",{onSubmit:p,className:"bug-report-form p-2",children:[e.jsxs("div",{className:"mb-4 text-center",children:[e.jsx("div",{className:"bug-icon-wrapper mb-2",children:e.jsx(h,{size:30,color:"#162788"})}),e.jsx("p",{className:"text-muted small",children:"Please provide as much detail as possible to help us squash this bug."})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"bug-title",className:"form-label fw-bold small",children:"Bug Title"}),e.jsx("input",{type:"text",id:"bug-title",className:"form-control",placeholder:"What's going wrong?",value:r,onChange:s=>c(s.target.value),required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"bug-desc",className:"form-label fw-bold small",children:"Description"}),e.jsx("textarea",{id:"bug-desc",className:"form-control",rows:4,placeholder:"Explain the steps to reproduce the issue...",value:o,onChange:s=>n(s.target.value),required:!0})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"form-label fw-bold small",children:"Attach Recording/Screenshot"}),e.jsxs("div",{className:"file-upload-wrapper",children:[e.jsx("input",{type:"file",id:"bug-file",className:"form-control d-none",accept:"image/*,video/*",onChange:s=>d(s.target.files[0])}),e.jsxs("label",{htmlFor:"bug-file",className:"file-upload-label py-3",children:[e.jsx(x,{className:"mb-2"}),e.jsx("span",{children:t?t.name:"Click to upload a file"})]})]})]}),e.jsxs("div",{className:"d-flex gap-2 justify-content-end border-top pt-3",children:[e.jsx("button",{type:"button",className:"btn btn-light",onClick:i,children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn btn-primary px-4",style:{backgroundColor:"#162788",borderColor:"#162788"},children:"Submit Report"})]}),e.jsx("style",{children:`
        .bug-icon-wrapper {
          width: 60px;
          height: 60px;
          background: #f0f4ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .file-upload-label {
          border: 2px dashed #e2e8f0;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
        }
        .file-upload-label:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .form-control:focus {
          border-color: #162788;
          box-shadow: 0 0 0 0.25rem rgba(22, 39, 136, 0.1);
        }
      `})]})};export{N as default};
