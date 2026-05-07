import React from 'react';
import Screen from '@/components/ui/Screen';
import BrandHeader from '@/components/ui/BrandHeader';
import logo from "../../assets/logo.png"
import Login from './login';

export default function Home() {
  return (
    <Screen>
      <BrandHeader
        title="Mi App"
        subtitle="EN LA CONSOLA VAS A VER LO DE LA BD ;)"
        logo={logo} />
        <Login />
    </Screen>
  );
}
