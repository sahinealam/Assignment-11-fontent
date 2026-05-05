import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How often can I donate blood?",
            answer:
                "A healthy adult can donate blood every 3 to 4 months. This allows your body enough time to replenish the donated blood.",
        },
        {
            question: "Is blood donation safe?",
            answer:
                "Yes, blood donation is completely safe. All equipment used is sterile and disposable, ensuring zero risk of infection.",
        },
        {
            question: "Who can donate blood?",
            answer:
                "Anyone between 18–60 years old, in good health, and meeting basic medical criteria can donate blood.",
        },
        {
            question: "Does blood donation hurt?",
            answer:
                "You may feel a slight pinch when the needle is inserted, but the process is generally quick and painless.",
        },
        {
            question: "Do I get a health check before donating?",
            answer:
                "Yes, donors receive a free basic health check including blood pressure, hemoglobin level, and pulse rate.",
        },
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="">
            <div className="container mx-auto max-w-4xl">
                {/* Section Title */}
                <h2 className="text-3xl sm:text-5xl font-bold text-center text-red-600 mb-16 drop-shadow-md">
                    Frequently Asked Questions
                </h2>

                {/* FAQ Items */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-xl shadow-lg overflow-hidden"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {faq.question}
                                </h3>
                                <FaChevronDown
                                    className={`text-red-600 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            {activeIndex === index && (
                                <div className="px-6 pb-6 text-base leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;