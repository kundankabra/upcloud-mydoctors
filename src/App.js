import Cards from './Components/Cards'
import './App.css';

function App() {
  return (
    <div className="container">
    <br/><br/><br/> 
     <div className="row">
    <div className="col-sm-6">
      <Cards 
      experience="10"
      doctorName="Dr. Swapnil Katre"
      speciality="Ayurveda"
      rating="4.7"
      clinicName="Ayushman Bhava Ayurveda & Keraliya Panchkarma Clinic"
      price="750"
      feedbackNumber="778"
      areaNearby="3.1"
      area="Gunjal Baba Nagar"
      />
     </div>
    <br/><br/><br/><br/><br/> <br/> <br/>  
    <div className="col-sm-6">
      <Cards 
      experience="10"
      doctorName="Dr. Swapnil Krishnakant Katre"
      speciality="Ayurveda"
      rating="4.7"
      clinicName="Ayushman Bhava Ayurveda & Keraliya Panchkarma Clinic"
      price="750"
      feedbackNumber="778"
      areaNearby="3.1"
      area="Gunjal Baba Nagar"
      />
      </div>
    
<br/><br/><br/><br/><br/><br/>
      <div className="col-sm-6">
      <br/><br/><br/><br/><br/><br/>
     <Cards 
      experience="10"
      doctorName="Dr. Swapnil Katre"
      speciality="Ayurveda"
      rating="4.7"
      clinicName="Suddata Clinic"
      price="750"
      feedbackNumber="778"
      areaNearby="3.1"
      area="Gunjal Baba Nagar"
      />
  </div>

 <br/><br/><br/><br/><br/><br/>
 <div className="col-sm-6">
 <br/><br/><br/><br/><br/><br/>
    <Cards 
      experience="10"
      doctorName="Dr. Swapnil Katre"
      speciality="Ayurveda"
      rating="4.7"
      clinicName="Kundan Multispeciality"
      price="750"
      feedbackNumber="778"
      areaNearby="3.1"
      area="Gunjal Baba Nagar"
      /> 
      </div>
      <br/><br/><br/><br/><br/><br/>
    </div>
    </div>
  );
}

export default App;
