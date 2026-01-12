import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="bg-[var(--color-accent)] text-[var(--color-primary)] font-[var(--font-main)] min-h-screen">
            <section className="py-20 px-8 md:px-24 bg-[var(--color-maroon)] text-white text-center rounded-b-[50px]">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Return Policy</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto italic">
                    Your satisfaction is our priority. Here's how we handle returns.
                </p>
            </section>

            <section className="py-24 px-8 md:px-24 max-w-4xl mx-auto">
                <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-black/5">
                    <h2 className="text-2xl font-bold text-[var(--color-maroon)] mb-6 font-serif underline decoration-[var(--color-secondary)]">Quality Guarantee</h2>
                    <p className="mb-6 leading-relaxed text-gray-700">
                        At SKS Sandila Laddu, we take immense pride in the quality and freshness of our products. Due to the perishable nature of our sweets, we do not accept general returns once the product has been delivered.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--color-maroon)] mb-6 font-serif underline decoration-[var(--color-secondary)]">Damaged or Incorrect Items</h2>
                    <p className="mb-6 leading-relaxed text-gray-700">
                        In the rare event that your order arrives damaged or if you receive the wrong item, please contact us within 24 hours of delivery.
                    </p>
                    <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-3">
                        <li>Email us at <strong>sksladdu8313@gmail.com</strong> with your order number and clear photos of the damaged product.</li>
                        <li>Once verified, we will either send a replacement or process a full refund to your original payment method.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--color-maroon)] mb-6 font-serif underline decoration-[var(--color-secondary)]">Cancellation Policy</h2>
                    <p className="mb-6 leading-relaxed text-gray-700">
                        Orders can only be cancelled within 1 hour of placement. Since we prepare our laddus fresh to order, we cannot cancel or refund orders that have already entered the production or shipping phase.
                    </p>

                    <div className="mt-12 p-6 bg-[var(--color-accent)] rounded-2xl italic text-[var(--color-maroon)] border-l-4 border-[var(--color-secondary)]">
                        "We strive to ensure every box of laddus brings a smile to your face. If you're not happy, we want to hear from you."
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReturnPolicy;
