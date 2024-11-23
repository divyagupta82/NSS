import React, { useState } from "react";
import "../Faqs.css";

export default function Faqs() {
    const [activeIndex, setActiveIndex] = useState(null); // Track the active FAQ item

    const handleToggle = (index) => {
        // Toggle the active item; if it's the same item, set it to null to collapse
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faqs">
            <h1>FAQ'S</h1>

            {[
                {
                    question: "What is the National Service Scheme (NSS) Club?",
                    answer: "The National Service Scheme (NSS) is an Indian government-sponsored public service program conducted by the Ministry of Youth Affairs and Sports of the Government of India."
                },
                {
                    question: "What is the main objective of the NSS Club?",
                    answer: "The main objective of the NSS Club is to provide hands-on experience in social service to young students in India."
                },
                {
                    question: "Who can join the NSS Club? Is it only for students?",
                    answer: "The NSS Club is mainly for students in schools, colleges, and universities, but certain activities may involve the wider community."
                },
                {
                    question: "How do I become a member of the NSS Club?",
                    answer: "You can join the NSS Club through your educational institution or by contacting the NSS coordinator in your area."
                },
                {
                    question: "What are the benefits of joining the NSS Club?",
                    answer: "Joining the NSS Club allows students to develop leadership skills, engage in community service, and contribute positively to society."
                },
                {
                    question: "How much time is required for NSS Club activities?",
                    answer: "The time commitment for NSS Club activities varies, but members typically participate in regular events and programs throughout the academic year."
                }
            ].map((faq, index) => (
                <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => handleToggle(index)}>
                        {faq.question}
                    </button>
                    {/* Toggle the display of the answer based on the activeIndex */}
                    <div className="faq-answer" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                        <p>{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
