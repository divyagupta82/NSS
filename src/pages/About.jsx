import React from 'react';
import image1 from "../components/images/Dean.jpg";
import '../pages/About.css'; // Import custom CSS for additional styling

const About = () => {
  return (
    <div className="about-container">
      
      {/* About Us Section */}
      <h2 className="section-heading">About Us</h2>
      <p className="section-content">
        The National Service Scheme (NSS) is an Indian government-sponsored public service program conducted by the Department of Youth
        Affairs and Sports of the Government of India. Popularly known as NSS, the scheme was launched in Gandhiji's Centenary year, 1969.
        In May 1969, a conference of student representatives (of universities and institutions of higher education) convened by the Ministry
        of Education and the University Grants Commission also unanimously agreed that a national-service scheme could be an instrument for
        national integration. The details were soon worked out and the Planning Commission sanctioned an outlay of ₹5 crores for the NSS
        during the Fourth Five-Year Plan, stipulating that the NSS be a pilot project in select institutions and universities. On 24
        September 1969, the then Union Education Minister V.K.R.V. Rao launched the NSS at 37 universities in all states. The scheme has been
        extended to all states and universities in the country, and also +2 level institutes in many states.
      </p>

      {/* Motto Section */}
      <h2 className="section-heading">Motto</h2>
      <p className="section-content">
        This annual report merely reflects the passion for selfless service, dedication for community engagement and social commitment of
        our volunteers under the rubric of "NOT ME, BUT YOU." One of the key objectives of NSS is to awaken the social consciousness of the
        students and provide them with an opportunity to engage with people around the campus constructively and to impart public social
        responsibility. The motto of NSS is "NOT ME BUT YOU", which expresses the essence of democratic living, upholds the need for
        selfless service and volunteerism and underlines that individual welfare is dependent on the welfare of the society as a whole.
      </p>

      {/* Symbol Section */}
      <h2 className="section-heading">Symbol</h2>
      <p className="section-content">
        The symbol of the NSS is based on the 'Rath' wheel of the Konark Sun Temple situated in Orissa. These giant wheels of the Sun Temple
        portray the cycle of creation, preservation and release, and signify the movement in life across time and space. It stands for
        community as well as change and implies the continuous striving of National Service Scheme for social transformation & upliftment.
      </p>

      {/* NSS Program Officer Section */}
      <h2 className="section-heading highlight">NSS Program Officer</h2>
      <div className="program-officer">
        <img src={image1} alt="NSS Program Officer" className="officer-image" />
        <p className="officer-content">
          National Service Scheme is a student-centered programme and it is complementary to education. It is a noble experiment in academic
          extension. It inculcates the spirit of voluntary work among students and teachers through sustained community interaction. It brings
          our academic institutions closer to society. It is a link between the campus and community, the college and village, knowledge and action.
          The overall aim of NSS is the Personality Development of students through community service. It gives an extension dimension to
          the Higher Education system and orients the student youth to community service.
        </p>
      </div>

      {/* Department Wise Faculty Coordinators Section */}
      <h2 className="section-heading highlight">Department Wise Faculty Coordinators</h2>
      <table className="coordinator-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Name of the Coordinator</th>
            <th>Mobile No.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CSE</td>
            <td>Mr. Sriharesh</td>
            <td>9047079779</td>
          </tr>
          <tr>
            <td>IT & MCA</td>
            <td>Mr. P. SubbaRao</td>
            <td>8977178466</td>
          </tr>
          <tr>
            <td>ECE</td>
            <td>Mr. Sandana Mahalingam</td>
            <td>09442756453</td>
          </tr>
          <tr>
            <td>EEE</td>
            <td>Mr. Vamsi Kumar</td>
            <td>8985450128</td>
          </tr>
          <tr>
            <td>BIOTECH</td>
            <td>Mr. T.C. Venkateswarlu</td>
            <td>9000390204</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default About;