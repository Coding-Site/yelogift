import { useEffect } from 'react';

export default function TermAndConditions() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-mainLightBlack p-6">
            <div className="bg-mainBlack shadow-md rounded-lg p-8 max-w-2xl text-mainWhite">
                <h1 className="text-3xl font-bold mb-4 text-mainLightColor text-center">
                    TERM AND CONDITIONS
                </h1>
                <ul className="list-disc list-inside space-y-4">
                    <li>You can use the card code for only one time.</li>
                    <li>
                        Card code should be entered correctly for the caps lock
                        sensitivity.
                    </li>
                    <li>
                        Please make sure of the type and category of the card
                        before completing the purchase.
                    </li>
                    <li>
                        Wrong transfers shall be returned to the same
                        transferring account within three working days.
                    </li>
                    <li>
                        Cards delivered to you via our channels could not be
                        refunded or exchanged if there is nothing wrong in them.
                    </li>
                    <li>
                        Yelogift holds no liability for wrong purchases you
                        performed due to negligence or entering wrong
                        information that may lead to damage/ loss via purchasing
                        the card.
                    </li>
                    <li>
                        Any problems that may appear in the card after purchase
                        and entered by the client to their device (as wrong code
                        or that it appears as charged before… the parent company
                        shall be addressed in order to know the reason and the
                        date and time of charging the code… that shall take from
                        one to five days). You should notify us within the first
                        three days after purchasing the card.
                    </li>
                    <li>
                        Administrative fees shall be charged when using credit
                        cards.
                    </li>
                    <li>
                        Any doubtful purchase shall be terminated immediately
                        and shall not be completed. All data shall be sent to
                        the Electronic Crimes Department in the Ministry of
                        Trade to complete the legal procedures in that concern.
                    </li>
                    <li>
                        When ordering Google Play cards, Google company
                        sometimes asks you for more information. Yelogift has no
                        responsibility when they ask you that.
                    </li>
                    <li>
                        When an amount is approved as a wallet balance, the
                        amount cannot be refunded again.
                    </li>
                    <li>
                        These terms may be changed and developed all the time.
                        So, clients may refer to them periodically and if any
                        part of it appeared ambiguous or wrong, please notify
                        us.
                    </li>
                </ul>
            </div>
        </div>
    );
}
