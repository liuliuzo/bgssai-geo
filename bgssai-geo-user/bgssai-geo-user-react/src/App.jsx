import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div data-page="home" />} />
      <Route path="/subdomains" element={<div data-page="subdomains" />} />
      <Route path="/sites/:subdomain" element={<div data-page="site-home" />} />
      <Route path="/sites/:subdomain/articles/:slug" element={<div data-page="site-article" />} />
      <Route path="/articles/:slug" element={<div data-page="article-detail" />} />
      <Route path="/categories/:category" element={<div data-page="category-archive" />} />
      <Route path="/search" element={<div data-page="search" />} />
    </Routes>
  );
}
