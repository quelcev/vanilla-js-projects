const testimonials = [
  {
    name: "Emily Johnson",
    text: "I am extremely impressed with Interad's top-notch software for web development. It has greatly improved our efficiency and productivity. I highly recommend Interad to anyone looking to enhance their online presence.",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Emily Thompson",
    text: "I am extremely impressed with Interad's software. Their expertise in web development shines through in every aspect of their product. Truly top-notch quality!",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amanda Thomas",
    text: "Interad's cutting-edge software for web development has helped streamline our workflow and boost productivity. I highly recommend their products for anyone looking to enhance their online presence.",
    photoUrl:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const textEl = document.querySelector(".text");
const usernameEl = document.querySelector(".username");
const testimonialContainerEl = document.querySelector(".testimonial-container");
let testimonialsIndex = 0;

setTestimonial();

setInterval(() => {
  testimonialsIndex++;
  if (testimonialsIndex === testimonials.length) {
    testimonialsIndex = 0;
  }
  setTestimonial();
}, 7000);

function setTestimonial() {
  const { photoUrl, text, name } = testimonials[testimonialsIndex];
  const imgTag = document.createElement("img");
  imgTag.src = photoUrl;
  imgTag.alt = "user image";
  testimonialContainerEl.prepend(imgTag);
  textEl.innerText = text;
  usernameEl.innerText = name;
  setTimeout(() => {
    imgTag.remove();
  }, 7000);
}
