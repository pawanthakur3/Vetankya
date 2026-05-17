export const CITIES = ["All India","Bengaluru","Mumbai","Delhi NCR","Hyderabad","Pune","Chennai","Kolkata","Ahmedabad","Jaipur","Indore"];

export const ROLES = [
  "Software Engineer","Senior Software Engineer","Data Analyst","Data Scientist",
  "Product Manager","Business Analyst","DevOps Engineer","Frontend Developer",
  "Backend Developer","Full Stack Developer","UI/UX Designer","QA Engineer",
  "Digital Marketing Manager","Sales Executive","HR Manager","Finance Analyst",
  "Chartered Accountant","MBA Fresher","BCA/B.Sc IT Fresher","Marketing Executive",
];

export const COMPANIES = [
  "TCS","Infosys","Wipro","HCL","Cognizant","Accenture","IBM","Capgemini",
  "Tech Mahindra","L&T Infotech","Flipkart","Amazon","Swiggy","Zomato",
  "Paytm","BYJU'S","Ola","PhonePe","Razorpay","Meesho",
];

export const EXPERIENCES = ["0-1 years (Fresher)","1-3 years","3-5 years","5-8 years","8-12 years","12+ years"];

export const SALARY_DATA = {
  "Software Engineer": {
    "All India":  { min:4,  median:8,   max:18,  yoy:12, sample:4820 },
    "Bengaluru":  { min:6,  median:12,  max:28,  yoy:14, sample:1840 },
    "Mumbai":     { min:5,  median:10,  max:22,  yoy:11, sample:920  },
    "Delhi NCR":  { min:5,  median:10,  max:22,  yoy:10, sample:1100 },
    "Hyderabad":  { min:5,  median:10,  max:24,  yoy:13, sample:860  },
    "Pune":       { min:5,  median:9,   max:20,  yoy:12, sample:740  },
    "Chennai":    { min:4,  median:8,   max:18,  yoy:10, sample:580  },
  },
  "Senior Software Engineer": {
    "All India":  { min:10, median:18,  max:40,  yoy:15, sample:2940 },
    "Bengaluru":  { min:14, median:24,  max:55,  yoy:17, sample:1240 },
    "Mumbai":     { min:12, median:20,  max:45,  yoy:13, sample:620  },
    "Delhi NCR":  { min:12, median:20,  max:44,  yoy:12, sample:680  },
    "Hyderabad":  { min:12, median:21,  max:48,  yoy:16, sample:540  },
    "Pune":       { min:11, median:18,  max:40,  yoy:13, sample:460  },
    "Chennai":    { min:10, median:16,  max:36,  yoy:11, sample:360  },
  },
  "Data Analyst": {
    "All India":  { min:3,  median:7,   max:16,  yoy:18, sample:3200 },
    "Bengaluru":  { min:5,  median:10,  max:22,  yoy:20, sample:980  },
    "Mumbai":     { min:4,  median:8,   max:18,  yoy:17, sample:620  },
    "Delhi NCR":  { min:4,  median:8,   max:18,  yoy:16, sample:740  },
    "Hyderabad":  { min:4,  median:8,   max:18,  yoy:19, sample:480  },
    "Pune":       { min:3,  median:7,   max:15,  yoy:18, sample:340  },
    "Chennai":    { min:3,  median:6,   max:14,  yoy:15, sample:280  },
  },
  "Data Scientist": {
    "All India":  { min:6,  median:14,  max:35,  yoy:22, sample:1800 },
    "Bengaluru":  { min:9,  median:18,  max:45,  yoy:24, sample:720  },
    "Mumbai":     { min:8,  median:16,  max:40,  yoy:20, sample:380  },
    "Delhi NCR":  { min:8,  median:15,  max:38,  yoy:19, sample:420  },
    "Hyderabad":  { min:8,  median:16,  max:40,  yoy:23, sample:320  },
    "Pune":       { min:7,  median:13,  max:32,  yoy:21, sample:240  },
  },
  "Product Manager": {
    "All India":  { min:8,  median:20,  max:55,  yoy:16, sample:1420 },
    "Bengaluru":  { min:12, median:28,  max:75,  yoy:18, sample:580  },
    "Mumbai":     { min:10, median:24,  max:65,  yoy:15, sample:340  },
    "Delhi NCR":  { min:10, median:22,  max:60,  yoy:14, sample:380  },
    "Hyderabad":  { min:10, median:22,  max:60,  yoy:17, sample:260  },
    "Pune":       { min:9,  median:19,  max:50,  yoy:15, sample:180  },
  },
  "Business Analyst": {
    "All India":  { min:4,  median:9,   max:20,  yoy:11, sample:2600 },
    "Bengaluru":  { min:6,  median:13,  max:28,  yoy:13, sample:840  },
    "Mumbai":     { min:5,  median:11,  max:24,  yoy:11, sample:580  },
    "Delhi NCR":  { min:5,  median:11,  max:24,  yoy:10, sample:640  },
    "Pune":       { min:5,  median:10,  max:22,  yoy:11, sample:420  },
  },
  "DevOps Engineer": {
    "All India":  { min:6,  median:14,  max:32,  yoy:19, sample:1600 },
    "Bengaluru":  { min:9,  median:20,  max:45,  yoy:22, sample:620  },
    "Mumbai":     { min:8,  median:17,  max:38,  yoy:18, sample:340  },
    "Delhi NCR":  { min:8,  median:16,  max:36,  yoy:17, sample:380  },
    "Hyderabad":  { min:8,  median:17,  max:40,  yoy:21, sample:280  },
    "Pune":       { min:7,  median:14,  max:32,  yoy:19, sample:220  },
  },
  "Frontend Developer": {
    "All India":  { min:3,  median:8,   max:20,  yoy:13, sample:2800 },
    "Bengaluru":  { min:5,  median:12,  max:28,  yoy:15, sample:920  },
    "Mumbai":     { min:4,  median:10,  max:24,  yoy:12, sample:540  },
    "Delhi NCR":  { min:4,  median:10,  max:22,  yoy:11, sample:620  },
    "Hyderabad":  { min:4,  median:10,  max:24,  yoy:14, sample:420  },
    "Pune":       { min:4,  median:9,   max:20,  yoy:13, sample:360  },
  },
  "UI/UX Designer": {
    "All India":  { min:3,  median:8,   max:22,  yoy:14, sample:1800 },
    "Bengaluru":  { min:5,  median:12,  max:30,  yoy:16, sample:640  },
    "Mumbai":     { min:4,  median:10,  max:26,  yoy:14, sample:440  },
    "Delhi NCR":  { min:4,  median:10,  max:25,  yoy:13, sample:480  },
    "Pune":       { min:4,  median:9,   max:22,  yoy:14, sample:320  },
  },
  "MBA Fresher": {
    "All India":  { min:5,  median:9,   max:20,  yoy:8,  sample:3200 },
    "Bengaluru":  { min:7,  median:12,  max:28,  yoy:10, sample:840  },
    "Mumbai":     { min:6,  median:11,  max:25,  yoy:9,  sample:760  },
    "Delhi NCR":  { min:6,  median:11,  max:26,  yoy:8,  sample:820  },
    "Pune":       { min:6,  median:10,  max:22,  yoy:9,  sample:560  },
  },
  "BCA/B.Sc IT Fresher": {
    "All India":  { min:2,  median:4,   max:8,   yoy:6,  sample:5400 },
    "Bengaluru":  { min:3,  median:5,   max:10,  yoy:8,  sample:1200 },
    "Mumbai":     { min:2,  median:4.5, max:9,   yoy:6,  sample:720  },
    "Delhi NCR":  { min:2,  median:4.5, max:9,   yoy:6,  sample:840  },
    "Pune":       { min:2,  median:4,   max:8,   yoy:7,  sample:640  },
    "Hyderabad":  { min:2,  median:4.5, max:9,   yoy:8,  sample:580  },
  },
  "Sales Executive": {
    "All India":  { min:2,  median:5,   max:12,  yoy:9,  sample:6200 },
    "Bengaluru":  { min:3,  median:6,   max:15,  yoy:10, sample:1400 },
    "Mumbai":     { min:3,  median:6,   max:16,  yoy:10, sample:1200 },
    "Delhi NCR":  { min:3,  median:6,   max:15,  yoy:9,  sample:1400 },
    "Pune":       { min:2,  median:5,   max:12,  yoy:9,  sample:800  },
  },
  "HR Manager": {
    "All India":  { min:4,  median:9,   max:20,  yoy:8,  sample:2200 },
    "Bengaluru":  { min:6,  median:12,  max:26,  yoy:9,  sample:680  },
    "Mumbai":     { min:5,  median:11,  max:24,  yoy:8,  sample:540  },
    "Delhi NCR":  { min:5,  median:11,  max:24,  yoy:8,  sample:620  },
    "Pune":       { min:5,  median:10,  max:22,  yoy:8,  sample:420  },
  },
  "Finance Analyst": {
    "All India":  { min:4,  median:9,   max:22,  yoy:10, sample:2400 },
    "Mumbai":     { min:6,  median:13,  max:30,  yoy:11, sample:920  },
    "Bengaluru":  { min:5,  median:11,  max:26,  yoy:10, sample:580  },
    "Delhi NCR":  { min:5,  median:11,  max:26,  yoy:10, sample:640  },
    "Pune":       { min:5,  median:10,  max:24,  yoy:10, sample:440  },
  },
  "Chartered Accountant": {
    "All India":  { min:6,  median:12,  max:30,  yoy:9,  sample:1800 },
    "Mumbai":     { min:8,  median:16,  max:40,  yoy:10, sample:680  },
    "Delhi NCR":  { min:7,  median:14,  max:35,  yoy:9,  sample:580  },
    "Bengaluru":  { min:7,  median:14,  max:34,  yoy:9,  sample:480  },
    "Pune":       { min:6,  median:12,  max:28,  yoy:9,  sample:360  },
  },
  "Digital Marketing Manager": {
    "All India":  { min:3,  median:7,   max:18,  yoy:15, sample:2800 },
    "Bengaluru":  { min:5,  median:10,  max:24,  yoy:17, sample:720  },
    "Mumbai":     { min:4,  median:9,   max:22,  yoy:15, sample:640  },
    "Delhi NCR":  { min:4,  median:9,   max:22,  yoy:14, sample:680  },
    "Pune":       { min:4,  median:8,   max:18,  yoy:15, sample:440  },
  },
  "QA Engineer": {
    "All India":  { min:3,  median:7,   max:16,  yoy:9,  sample:2400 },
    "Bengaluru":  { min:5,  median:10,  max:22,  yoy:11, sample:760  },
    "Mumbai":     { min:4,  median:8,   max:18,  yoy:9,  sample:480  },
    "Delhi NCR":  { min:4,  median:8,   max:18,  yoy:9,  sample:560  },
    "Hyderabad":  { min:4,  median:8,   max:18,  yoy:10, sample:440  },
    "Pune":       { min:4,  median:7,   max:16,  yoy:9,  sample:380  },
  },
  "Full Stack Developer": {
    "All India":  { min:4,  median:10,  max:24,  yoy:14, sample:3200 },
    "Bengaluru":  { min:7,  median:15,  max:35,  yoy:16, sample:1080 },
    "Mumbai":     { min:6,  median:12,  max:28,  yoy:13, sample:620  },
    "Delhi NCR":  { min:6,  median:12,  max:28,  yoy:12, sample:720  },
    "Hyderabad":  { min:6,  median:12,  max:28,  yoy:15, sample:520  },
    "Pune":       { min:5,  median:10,  max:24,  yoy:14, sample:440  },
  },
  "Backend Developer": {
    "All India":  { min:4,  median:9,   max:22,  yoy:13, sample:2800 },
    "Bengaluru":  { min:6,  median:14,  max:32,  yoy:15, sample:980  },
    "Mumbai":     { min:5,  median:11,  max:26,  yoy:12, sample:560  },
    "Delhi NCR":  { min:5,  median:11,  max:26,  yoy:12, sample:640  },
    "Hyderabad":  { min:5,  median:11,  max:28,  yoy:14, sample:460  },
    "Pune":       { min:5,  median:10,  max:22,  yoy:13, sample:380  },
  },
  "Marketing Executive": {
    "All India":  { min:2,  median:5,   max:12,  yoy:10, sample:3600 },
    "Mumbai":     { min:3,  median:6,   max:15,  yoy:11, sample:880  },
    "Delhi NCR":  { min:3,  median:6,   max:14,  yoy:10, sample:920  },
    "Bengaluru":  { min:3,  median:6,   max:14,  yoy:11, sample:720  },
    "Pune":       { min:2,  median:5,   max:12,  yoy:10, sample:560  },
  },
};

export const COMPANY_DATA = {
  "TCS": {
    hq: "Mumbai", employees: "600,000+", rating: 3.8,
    roles: [
      { title:"Software Engineer",        ctc:"3.5 – 8L",   yoe:"0-2" },
      { title:"Senior Software Engineer", ctc:"8 – 16L",    yoe:"3-6" },
      { title:"Technical Lead",           ctc:"14 – 24L",   yoe:"6-10" },
      { title:"Delivery Manager",         ctc:"22 – 40L",   yoe:"10+" },
      { title:"Business Analyst",         ctc:"5 – 12L",    yoe:"2-5" },
      { title:"QA Engineer",              ctc:"3.5 – 9L",   yoe:"0-3" },
    ],
  },
  "Infosys": {
    hq: "Bengaluru", employees: "350,000+", rating: 3.9,
    roles: [
      { title:"Software Engineer",        ctc:"3.5 – 9L",   yoe:"0-2" },
      { title:"Senior Engineer",          ctc:"9 – 18L",    yoe:"3-6" },
      { title:"Tech Lead",                ctc:"16 – 28L",   yoe:"6-10" },
      { title:"Principal Architect",      ctc:"28 – 55L",   yoe:"10+" },
      { title:"Business Analyst",         ctc:"5 – 13L",    yoe:"2-5" },
      { title:"HR Executive",             ctc:"3 – 7L",     yoe:"0-3" },
    ],
  },
  "Flipkart": {
    hq: "Bengaluru", employees: "50,000+", rating: 4.1,
    roles: [
      { title:"Software Engineer",        ctc:"18 – 35L",   yoe:"1-4" },
      { title:"Senior SDE",               ctc:"30 – 60L",   yoe:"4-8" },
      { title:"Product Manager",          ctc:"28 – 60L",   yoe:"3-8" },
      { title:"Data Scientist",           ctc:"20 – 45L",   yoe:"2-6" },
      { title:"Category Manager",         ctc:"12 – 25L",   yoe:"3-6" },
      { title:"Business Analyst",         ctc:"10 – 22L",   yoe:"2-5" },
    ],
  },
  "Amazon": {
    hq: "Hyderabad (India HQ)", employees: "100,000+", rating: 4.0,
    roles: [
      { title:"SDE-1",                    ctc:"22 – 40L",   yoe:"0-3" },
      { title:"SDE-2",                    ctc:"35 – 70L",   yoe:"3-7" },
      { title:"SDE-3",                    ctc:"60 – 120L",  yoe:"7+" },
      { title:"Product Manager",          ctc:"35 – 75L",   yoe:"4-8" },
      { title:"Data Engineer",            ctc:"18 – 45L",   yoe:"2-6" },
      { title:"Operations Manager",       ctc:"10 – 20L",   yoe:"3-7" },
    ],
  },
  "Swiggy": {
    hq: "Bengaluru", employees: "5,000+", rating: 3.9,
    roles: [
      { title:"Software Engineer",        ctc:"18 – 40L",   yoe:"1-4" },
      { title:"Senior Engineer",          ctc:"30 – 65L",   yoe:"4-8" },
      { title:"Product Manager",          ctc:"25 – 55L",   yoe:"3-7" },
      { title:"Data Scientist",           ctc:"18 – 42L",   yoe:"2-6" },
      { title:"Marketing Manager",        ctc:"12 – 25L",   yoe:"3-6" },
    ],
  },
  "Wipro": {
    hq: "Bengaluru", employees: "250,000+", rating: 3.7,
    roles: [
      { title:"Software Engineer",        ctc:"3.5 – 8L",   yoe:"0-2" },
      { title:"Senior Software Engineer", ctc:"8 – 16L",    yoe:"3-6" },
      { title:"Tech Lead",                ctc:"14 – 24L",   yoe:"6-10" },
      { title:"Project Manager",          ctc:"18 – 35L",   yoe:"8+" },
      { title:"Business Analyst",         ctc:"5 – 12L",    yoe:"2-5" },
    ],
  },
  "Zomato": {
    hq: "Gurugram", employees: "6,000+", rating: 3.8,
    roles: [
      { title:"Software Engineer",        ctc:"16 – 35L",   yoe:"1-4" },
      { title:"Senior SDE",               ctc:"28 – 55L",   yoe:"4-8" },
      { title:"Product Manager",          ctc:"24 – 52L",   yoe:"3-7" },
      { title:"Data Analyst",             ctc:"10 – 24L",   yoe:"1-4" },
      { title:"City Operations Manager",  ctc:"8 – 18L",    yoe:"2-5" },
    ],
  },
  "Razorpay": {
    hq: "Bengaluru", employees: "3,000+", rating: 4.3,
    roles: [
      { title:"Software Engineer",        ctc:"20 – 45L",   yoe:"1-4" },
      { title:"Senior Engineer",          ctc:"35 – 70L",   yoe:"4-8" },
      { title:"Product Manager",          ctc:"30 – 65L",   yoe:"3-7" },
      { title:"Data Scientist",           ctc:"20 – 48L",   yoe:"2-6" },
      { title:"Sales Manager",            ctc:"12 – 28L",   yoe:"3-6" },
    ],
  },
};

export const TRENDING = [
  { role: "Data Scientist",     city: "Bengaluru", yoy: 24, median: 18 },
  { role: "DevOps Engineer",    city: "Bengaluru", yoy: 22, median: 20 },
  { role: "Product Manager",    city: "Bengaluru", yoy: 18, median: 28 },
  { role: "Full Stack Dev",     city: "Hyderabad", yoy: 15, median: 12 },
  { role: "Digital Marketing",  city: "Mumbai",    yoy: 15, median: 9  },
];
