import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
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
        justifyContent: 'space-between',
        height: 50,
        paddingLeft: 0,
        flexDirection:"row"
    },

    back: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

const tos_intro = `
Last updated: September 25, 2017

Please read these Terms of Service ("Terms", "Terms of Service") carefully`
    + ` before using the hamyk mobile application (the`
    + ` "Service") operated by Chatterfly Inc. ("us", "we",`
    + ` or "our").~

Your access to and use of the Service is conditioned upon your acceptance of and`
    + ` compliance with these Terms. These Terms apply to all`
    + ` visitors, users and others who wish to access or use`
    + ` the Service.~

By using the Service, you agree to the terms of this Service and to any`
    + ` additional rules and guidelines that we post in the`
    + ` Service. By accessing or using the Service you agree`
    + ` to be bound by these Terms. If you disagree with any`
    + ` part of the terms then you should not use the`
    + ` Service.
`;


const tos_communications = `
By creating an Account on our service, you agree to subscribe to newsletters,`
    + ` marketing or promotional materials and other information we may`
    + ` send. However, you may opt out of receiving any, or all, of these`
    + ` communications from us by following the unsubscribe link or`
    + ` instructions provided in any email we send.
`;


const tos_content = `
Our Service allows you to post, link, store, share and otherwise make available`
    + ` certain information, text, graphics, videos, or other material`
    + ` ("Content"). You are responsible for the Content that you post on or`
    + ` through the Service, including its legality, reliability, and`
    + ` appropriateness.

By posting Content on or through the Service, You represent and warrant that:`
    + ` (i) the Content is yours (you own it) and/or you have the right to use`
    + ` it and the right to grant us the rights and license as provided in`
    + ` these Terms, and (ii) that the posting of your Content on or through`
    + ` the Service does not violate the privacy rights, publicity rights,`
    + ` copyrights, contract rights or any other rights of any person or`
    + ` entity. We reserve the right to terminate the account of anyone found`
    + ` to be infringing on a copyright.

You retain any and all of your rights to any Content you submit, post or display`
    + ` on or through the Service and you are responsible for protecting those`
    + ` rights. We take no responsibility and assume no liability for Content`
    + ` you or any third party posts on or through the Service. However, by`
    + ` posting Content using the Service you grant us the right and license`
    + ` to use, modify, publicly perform, publicly display, reproduce, and`
    + ` distribute such Content on and through the Service. You agree that`
    + ` this license includes the right for us to make your Content available`
    + ` to other users of the Service, who may also use your Content subject`
    + ` to these Terms.

Chatterfly Inc. has the right but not the obligation to monitor and edit all`
    + ` Content provided by users.

In addition, Content found on or through this Service are the property of`
    + ` Chatterfly Inc. or used with permission. You may not distribute,`
    + ` modify, transmit, reuse, download, repost, copy, or use said Content,`
    + ` whether in whole or in part, for commercial purposes or for personal`
    + ` gain, without express advance written permission from us.
`;

const tos_accounts = `
When you create an account with us, you guarantee that you are above the age of`
    + ` 13, and that the information you provide us is accurate, complete, and`
    + ` current at all times. Inaccurate, incomplete, or obsolete information`
    + ` may result in the immediate termination of your account on the`
    + ` Service.

You are responsible for maintaining the confidentiality of your account and`
    + ` password, including but not limited to the restriction of access to`
    + ` your computer and/or account. You agree to accept responsibility for`
    + ` any and all activities or actions that occur under your account and/or`
    + ` password, whether your password is with our Service or a third-party`
    + ` service. You must notify us immediately upon becoming aware of any`
    + ` breach of security or unauthorized use of your account.

You may not use as a username the name of another person or entity or that is`
    + ` not lawfully available for use, a name or trademark that is subject to`
    + ` any rights of another person or entity other than you, without`
    + ` appropriate authorization. You may not use as a username any name that`
    + ` is offensive, vulgar or obscene.
`;


const tos_ip = `
The Service and its original content (excluding Content provided by users),`
    + ` features and functionality are and will remain the exclusive property`
    + ` of Chatterfly Inc. and its licensors. The Service is protected by`
    + ` copyright, trademark, and other laws of both the United States and`
    + ` foreign countries. Our trademarks and trade dress may not be used in`
    + ` connection with any product or service without the prior written`
    + ` consent of Chatterfly Inc.
`;

const tos_links = `
Our Service may contain links to third party web sites or services that are not`
    + ` owned or controlled by Chatterfly Inc.

Chatterfly Inc. has no control over, and assumes no responsibility for the`
    + ` content, privacy policies, or practices of any third party web sites`
    + ` or services. We do not warrant the offerings of any of these`
    + ` entities/individuals or their websites.

You acknowledge and agree that Chatterfly Inc. shall not be responsible or`
    + ` liable, directly or indirectly, for any damage or loss caused or`
    + ` alleged to be caused by or in connection with use of or reliance on`
    + ` any such content, goods or services available on or through any such`
    + ` third party web sites or services.

We strongly advise you to read the terms and conditions and privacy policies of`
    + ` any third party web sites or services that you visit.
`;

const tos_termination = `
We may terminate or suspend your account and bar access to the Service`
    + ` immediately, without prior notice or liability, under our sole`
    + ` discretion, for any reason whatsoever and without limitation,`
    + ` including but not limited to a breach of the Terms.

If you wish to terminate your account, you may simply discontinue using the`
    + ` Service.

All provisions of the Terms which by their nature should survive termination`
    + ` shall survive termination, including, without limitation, ownership`
    + ` provisions, warranty disclaimers, indemnity and limitations of`
    + ` liability.
`;


const tos_indem = `
You agree to defend, indemnify and hold harmless Chatterfly Inc. and its`
    + ` licensee and licensors, and their employees, contractors, agents,`
    + ` officers and directors, from and against any and all claims, damages,`
    + ` obligations, losses, liabilities, costs or debt, and expenses`
    + ` (including but not limited to attorney's fees), resulting from or`
    + ` arising out of a) your use and access of the Service, by you or any`
    + ` person using your account and password; b) a breach of these Terms, or`
    + ` c) Content posted on the Service.
`;


const tos_limitation = `
In no event shall Chatterfly Inc. , nor its directors, employees, partners,`
    + ` agents, suppliers, or affiliates, be liable for any indirect,`
    + ` incidental, special, consequential or punitive damages, including`
    + ` without limitation, loss of profits, data, use, goodwill, or other`
    + ` intangible losses, resulting from (i) your access to or use of or`
    + ` inability to access or use the Service; (ii) any conduct or content of`
    + ` any third party on the Service; (iii) any content obtained from the`
    + ` Service; and (iv) unauthorized access, use or alteration of your`
    + ` transmissions or content, whether based on warranty, contract, tort`
    + ` (including negligence) or any other legal theory, whether or not we`
    + ` have been informed of the possibility of such damage, and even if a`
    + ` remedy set forth herein is found to have failed of its essential`
    + ` purpose.
`;

const tos_disclaimer = `
Your use of the Service is at your sole risk. The Service is provided on an "AS`
    + ` IS" and "AS AVAILABLE" basis. The Service is provided without`
    + ` warranties of any kind, whether express or implied, including, but not`
    + ` limited to, implied warranties of merchantability, fitness for a`
    + ` particular purpose, non-infringement or course of performance.

Chatterfly Inc. its subsidiaries, affiliates, and its licensors do not warrant`
    + ` that a) the Service will function uninterrupted, secure or available`
    + ` at any particular time or location; b) any errors or defects will be`
    + ` corrected; c) the Service is free of viruses or other harmful`
    + ` components; or d) the results of using the Service will meet your`
    + ` requirements.
`;

const tos_exclusions = `
Some jurisdictions do not allow the exclusion of certain warranties or the`
    + ` exclusion or limitation of liability for consequential or incidental`
    + ` damages, so the limitations above may not apply to you.
`;

const tos_gov = `
These Terms shall be governed and construed in accordance with the laws of`
    + ` Texas, United States, without regard to its conflict of law`
    + ` provisions.

Our failure to enforce any right or provision of these Terms will not be`
    + ` considered a waiver of those rights. If any provision of these Terms`
    + ` is held to be invalid or unenforceable by a court, the remaining`
    + ` provisions of these Terms will remain in effect. These Terms`
    + ` constitute the entire agreement between us regarding our Service, and`
    + ` supersede and replace any prior agreements we might have had between`
    + ` us regarding the Service.
`;

const tos_changes = `
We reserve the right, at our sole discretion, to modify or replace these Terms`
    + ` at any time. If a revision is material we will provide at least 30`
    + ` days notice prior to any new terms taking effect. What constitutes a`
    + ` material change will be determined at our sole discretion.


By continuing to access or use our Service after any revisions become effective,`
    + ` you agree to be bound by the revised terms.
`;

const tos_outro = `
If you have any questions about these Terms, please contact us-`
    + ` support@hamyk.com
`;

export default class TOS extends PureComponent {







    
    render() {
        return (
           

          
            <SafeAreaView style={{flex: 1}} >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={[styles.back,{marginLeft:5}]}>
                            Back
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text style={[styles.back,{marginRight:5}]}>
                            Accept
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.page}>
                        <Text style={styles.h1}>
                            Terms of Service
                        </Text>
                        <Text>
                            {tos_intro}
                        </Text>

                        <Text style={styles.h2}>
                            Communications
                        </Text>

                        <Text>
                            {tos_communications}
                        </Text>

                        <Text style={styles.h2}>
                            Content
                        </Text>

                        <Text>
                            {tos_content}
                        </Text>

                        <Text style={styles.h2}>
                            Accounts
                        </Text>

                        <Text>
                            {tos_accounts}
                        </Text>

                        <Text style={styles.h2}>
                            Intellectual Property
                        </Text>

                        <Text>
                            {tos_ip}
                        </Text>

                        <Text style={styles.h2}>
                            Links To Other Web Sites
                        </Text>

                        <Text>
                            {tos_links}
                        </Text>

                        <Text style={styles.h2}>
                            Termination
                        </Text>

                        <Text>
                            {tos_termination}
                        </Text>

                        <Text style={styles.h2}>
                            Indemnification
                        </Text>
                        <Text>
                            {tos_indem}
                        </Text>

                        <Text style={styles.h2}>
                            Limitation of Liability
                        </Text>

                        <Text>
                            {tos_limitation}
                        </Text>

                        <Text style={styles.h2}>
                            Disclaimer
                        </Text>

                        <Text>
                            {tos_disclaimer}
                        </Text>

                        <Text style={styles.h2}>
                            Exclusions
                        </Text>

                        <Text>
                            {tos_exclusions}
                        </Text>

                        <Text style={styles.h2}>
                            Governing Law
                        </Text>

                        <Text>
                            {tos_gov}
                        </Text>

                        <Text style={styles.h2}>
                            Changes
                        </Text>

                        <Text>
                            {tos_changes}
                        </Text>

                        <Text style={styles.h2}>
                            Contact Us
                        </Text>
                        <Text>
                            {tos_outro}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
           
        );
    }
}
