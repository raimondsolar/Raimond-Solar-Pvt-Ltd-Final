import React from 'react';

export default function SolarSubsidyPage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#0f2027', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#f39c12' }}>PM Surya Ghar Yojana</h1>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal', margin: '0 0 20px 0' }}>সোলার স্ট্রিট লাইট ও হোম লাইট সাবসিডি স্কিম</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#bdc3c7' }}>
          Raimond Solar-এর সাথে আপনার বাড়িতে বা ব্যবসায় বসান সোলার সিস্টেম আর পান সরকারি বিপুল ভর্তুকি (Subsidy)।
        </p>
      </section>

      {/* Subsidy Details Section */}
      <section style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <h3 style={{ fontSize: '1.8rem', borderBottom: '2px solid #f39c12', paddingBottom: '10px', marginBottom: '20px' }}>
          সাবসিডি স্ল্যাব এবং সুবিধা (Subsidy Slabs)
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#2c3e50', marginTop: '0' }}>১ কিলোওয়াট (1 KW) সিস্টেম</h4>
            <p>আপনার বাড়ির ছোট লোড এবং লাইট-ফ্যানের জন্য উপযোগী। এতে সরকারি নিয়ম অনুযায়ী সর্বোচ্চ সাবসিডি পাওয়া যাবে।</p>
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#2c3e50', marginTop: '0' }}>২ কিলোওয়াট (2 KW) SYSTEM</h4>
            <p>মাঝারি পরিবার যেখানে ফ্রিজ, টিভি এবং ওয়াশিং মেশিন চলে, তাদের জন্য এটি সবথেকে লাভজনক অপশন।</p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#2c3e50', marginTop: '0' }}>৩ কিলোওয়াট বা তার বেশি (3 KW+)</h4>
            <p>যারা এসি (AC) বা ভারী লোড চালাতে চান, তাদের জন্য আদর্শ। এই স্কিমে বড় অঙ্কের ফ্ল্যাট সাবসিডি সরাসরি ব্যাংক অ্যাকাউন্টে আসে।</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: '#ecf0f1', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#2c3e50', marginBottom: '20px' }}>কেন Raimond Solar বেছে নেবেন?</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
            আমরা দিচ্ছি দীর্ঘ ১৮ বছরের বিশ্বস্ততা, প্রিমিয়াম কোয়ালিটির সোলার প্যানেল, ইনভার্টার এবং লিথিয়াম ব্যাটারি সেটআপ। আমাদের দক্ষ টিম সম্পূর্ণ সরকারি গাইডলাইন মেনে আপনার সাবসিডি ফাইল প্রসেস করতে সাহায্য করবে।
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>আজই যোগাযোগ করুন</h3>
        <p style={{ color: '#666', marginBottom: '30px' }}>আপনার ছাদে সোলার বসাতে বা যেকোনো জিজ্ঞাসার জন্য আমাদের সাথে কথা বলুন।</p>
        <a 
          href="/" 
          style={{ 
            display: 'inline-block', 
            padding: '12px 30px', 
            backgroundColor: '#f39c12', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '25px', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 4px 10px rgba(243,156,18,0.3)'
          }}
        >
          মূল ওয়েবসাইটে ফিরে যান
        </a>
      </section>
    </div>
  );
}
