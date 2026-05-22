import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

import '../../themes/seller-theme.css';
import '../styles/SellerPages.css';
import '../styles/Faq.css';

const FAQ_ITEMS = [
    {
        id: 1,
        question: 'How do I list a new product?',
        answer: 'Go to Add product from the dashboard or navigation. Upload three images, fill in pricing and details, then publish. Your product appears in the buyer store once live.',
    },
    {
        id: 2,
        question: 'How do I update product name or price?',
        answer: 'Open the product from All products, then use Edit name or Edit price on the product page. Changes are saved immediately to your listing.',
    },
    {
        id: 3,
        question: 'How does the order workflow work?',
        answer: 'When a customer pays, the order appears under Orders with status "order placed". Progress it through Confirm → Packed → Shipped → Delivered using the action button on each order card.',
    },
    {
        id: 4,
        question: 'What happens when stock runs out?',
        answer: 'Buyers see stock levels on your listing. Keep stock updated when adding products or restocking so orders are not placed for unavailable items.',
    },
    {
        id: 5,
        question: 'Can I delete a product?',
        answer: 'Yes. On the product details page, use Delete product in the danger zone at the bottom. Confirm deletion — this cannot be undone.',
    },
    {
        id: 6,
        question: 'How are payouts handled?',
        answer: 'Payout and settlement details are managed by the 22Yards platform. Contact support for payout schedules and account questions.',
    },
    {
        id: 7,
        question: 'What image requirements should I follow?',
        answer: 'Upload three clear photos: front view, detail or angle, and context shot (e.g. in use or packaging). Good lighting helps buyers trust your listing.',
    },
    {
        id: 8,
        question: 'Who do I contact for help?',
        answer: 'Use the Contact link in the footer for platform support. For order-specific issues, check the customer details on the order card in your Orders page.',
    },
];

export default function Faq() {
    return (
        <div data-portal="seller" className="seller-page">
            <div className="seller-page__inner">
                <header className="seller-page__header">
                    <div>
                        <h1 className="seller-page__title">Frequently asked questions</h1>
                        <p className="seller-page__subtitle">
                            Quick answers for selling and managing your shop on 22Yards.
                        </p>
                    </div>
                </header>

                <div className="seller-card seller-faq__accordion">
                    <MDBAccordion alwaysOpen flush>
                        {FAQ_ITEMS.map(item => (
                            <MDBAccordionItem
                                key={item.id}
                                collapseId={item.id}
                                headerTitle={
                                    <>
                                        <i className="fas fa-question-circle seller-faq__icon" />
                                        {item.question}
                                    </>
                                }
                            >
                                {item.answer}
                            </MDBAccordionItem>
                        ))}
                    </MDBAccordion>
                </div>
            </div>
        </div>
    );
}
