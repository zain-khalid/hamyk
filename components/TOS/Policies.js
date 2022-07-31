import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

const styles = StyleSheet.create({
    h1: {
        fontFamily: 'avenir',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center'
    },

    h2: {
        fontFamily: 'avenir',
        fontSize: 20,
        color: 'black'
    },

    page: {
        padding: 15
    },

    header: {
        justifyContent: 'center',
        height: 50,
        paddingLeft: 15
    },

    back: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});


const policy_intro = `
Last updated: September 25, 2017

Chatterfly Inc. ("us", "we", or "our") operates the hamyk mobile application`
    + ` (the "Service").

This page informs you of our policies regarding the collection, use and`
    + ` disclosure of Personal Information when you use our Service.

We will not use or share your information with anyone except as described in`
    + ` this Privacy Policy.

By using the Service, you agree to the terms of this privacy policy and to any`
    + ` additional rules and guidelines that we post in the Service.

We use your Personal Information for providing and improving the Service. By`
    + ` using the Service, you agree to the collection and use of information`
    + ` in accordance with this policy. Unless otherwise defined in this`
    + ` Privacy Policy, terms used in this Privacy Policy have the same`
    + ` meanings as in our Terms and Conditions.
`;

const policy_info = `
While using our Service, we may ask you to provide us with certain personally`
    + ` identifiable information that can be used to contact or identify`
    + ` you. Personally identifiable information may include, but is not`
    + ` limited to, your phone number, other information ("Personal`
    + ` Information").

We collect this information for the purpose of providing the Service,`
    + ` identifying and communicating with you, responding to your`
    + ` requests/inquiries, servicing your purchase orders, and improving our`
    + ` services.
`;

const policy_log = `
When you access the Service by or through a mobile device, we may collect`
    + ` certain information automatically, including, but not limited to, the`
    + ` type of mobile device you use, your mobile device unique ID, the IP`
    + ` address of your mobile device, your mobile operating system, the type`
    + ` of mobile Internet browser you use and other statistics ("Log Data").

In addition, we may use third party services such as Google Analytics that`
    + ` collect, monitor and analyze this type of information in order to`
    + ` increase our Service's functionality. These third party service`
    + ` providers have their own privacy policies addressing how they use such`
    + ` information.

Please see the section regarding Location Information below regarding the use of`
    + ` your location information and your options.
`;

const policy_loc = `
We may use and store information about your location depending on the`
    + ` permissions you have set on your device. We use this information to`
    + ` provide features of our Service, to improve and customize our`
    + ` Service. You can enable or disable location services when you use our`
    + ` Service at anytime, through your mobile device settings.
`;

const policy_cookies = `
Cookies are files with a small amount of data, which may include an anonymous`
    + ` unique identifier. Cookies are sent to your browser from a web site`
    + ` and transferred to your device. We use cookies to collect information`
    + ` in order to improve our services for you.

You can instruct your browser to refuse all cookies or to indicate when a cookie`
    + ` is being sent. The Help feature on most browsers provide information`
    + ` on how to accept cookies, disable cookies or to notify you when`
    + ` receiving a new cookie.

If you do not accept cookies, you may not be able to use some features of our`
    + ` Service and we recommend that you leave them turned on.
`;

const policy_dnt = `
We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set`
    + ` in your web browser to inform websites that you do not want to be`
    + ` tracked.

You can enable or disable Do Not Track by visiting the Preferences or Settings`
    + ` page of your web browser.
`;

const policy_service = `
We may employ third party companies and individuals to facilitate our Service,`
    + ` to provide the Service on our behalf, to perform Service-related`
    + ` services and/or to assist us in analyzing how our Service is used.

These third parties have access to your Personal Information only to perform`
    + ` specific tasks on our behalf and are obligated not to disclose or use`
    + ` your information for any other purpose.
`;

const policy_compliance = `
We will disclose your Personal Information where required to do so by law or`
    + ` subpoena or if we believe that such action is necessary to comply with`
    + ` the law and the reasonable requests of law enforcement or to protect`
    + ` the security or integrity of our Service.
`;

const policy_business = `
If Chatterfly Inc. is involved in a merger, acquisition or asset sale, your`
    + ` Personal Information may be transferred as a business asset. In such`
    + ` cases, we will provide notice before your Personal Information is`
    + ` transferred and/or becomes subject to a different Privacy Policy.
`;

const policy_security = `
The security of your Personal Information is important to us, and we strive to`
    + ` implement and maintain reasonable, commercially acceptable security`
    + ` procedures and practices appropriate to the nature of the information`
    + ` we store, in order to protect it from unauthorized access,`
    + ` destruction, use, modification, or disclosure.

However, please be aware that no method of transmission over the internet, or`
    + ` method of electronic storage is 100% secure and we are unable to`
    + ` guarantee the absolute security of the Personal Information we have`
    + ` collected from you.
`;

const policy_links = `
Our Service may contain links to other sites that are not operated by us. If you`
    + ` click on a third party link, you will be directed to that third`
    + ` party's site. We strongly advise you to review the Privacy Policy of`
    + ` every site you visit.

We have no control over, and assume no responsibility for the content, privacy`
    + ` policies or practices of any third party sites or services.
`;

const policy_children = `
Only persons age 13 or older have permission to access our Service. Our Service`
    + ` does not address anyone under the age of 13 ("Children").

We do not knowingly collect personally identifiable information from children`
    + ` under 13. If you are a parent or guardian and you learn that your`
    + ` Children have provided us with Personal Information, please contact`
    + ` us. If we become aware that we have collected Personal Information`
    + ` from a children under age 13 without verification of parental consent,`
    + ` we take steps to remove that information from our servers.
`;

const policy_changes = `
This Privacy Policy is effective as of September 25, 2017 and will remain in`
    + ` effect except with respect to any changes in its provisions in the`
    + ` future, which will be in effect immediately after being posted on this`
    + ` page.

We reserve the right to update or change our Privacy Policy at any time and you`
    + ` should check this Privacy Policy periodically. Your continued use of`
    + ` the Service after we post any modifications to the Privacy Policy on`
    + ` this page will constitute your acknowledgment of the modifications and`
    + ` your consent to abide and be bound by the modified Privacy Policy.

If we make any material changes to this Privacy Policy, we will notify you`
    + ` either through the email address you have provided us, or by placing a`
    + ` prominent notice on our website.
`;

const policy_outro = `
If you have any questions about this Privacy Policy, please contact us-`
    + ` support@hamyk.com
`;

export default class Policies extends PureComponent {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{top: 'always', bottom: 'never'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() =>this.props.navigation.pop()}>
                        <Text style={styles.back}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.page}>
                        <Text style={styles.h1}>
                            Privacy Policy
                        </Text>

                        <Text>
                            {policy_intro}
                        </Text>

                        <Text style={styles.h2}>
                            Information Collection And Use
                        </Text>

                        <Text>
                            {policy_info}
                        </Text>


                        <Text style={styles.h2}>
                            Log Data
                        </Text>

                        <Text>
                            {policy_log}
                        </Text>

                        <Text style={styles.h2}>
                            Location Information
                        </Text>

                        <Text>
                            {policy_loc}
                        </Text>

                        <Text style={styles.h2}>
                            Cookies
                        </Text>

                        <Text>
                            {policy_cookies}
                        </Text>

                        <Text style={styles.h2}>
                            Do Not Track Disclosure
                        </Text>

                        <Text>
                            {policy_dnt}
                        </Text>

                        <Text style={styles.h2}>
                            Service Providers
                        </Text>

                        <Text>
                            {policy_service}
                        </Text>

                        <Text style={styles.h2}>
                            Compliance With Laws
                        </Text>

                        <Text>
                            {policy_compliance}
                        </Text>

                        <Text style={styles.h2}>
                            Business Transaction
                        </Text>

                        <Text>
                            {policy_business}
                        </Text>

                        <Text style={styles.h2}>
                            Security
                        </Text>

                        <Text>
                            {policy_security}
                        </Text>

                        <Text style={styles.h2}>
                            Links To Other Sites
                        </Text>

                        <Text>
                            {policy_links}
                        </Text>

                        <Text style={styles.h2}>
                            Children's Privacy
                        </Text>

                        <Text>
                            {policy_children}
                        </Text>

                        <Text style={styles.h2}>
                            Changes To This Privacy Policy
                        </Text>

                        <Text>
                            {policy_changes}
                        </Text>

                        <Text style={styles.h2}>
                            Contact Us
                        </Text>

                        <Text>
                            {policy_outro}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
