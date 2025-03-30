"use client";

import { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X, Sun, Moon, Heart, Award, Home, ShoppingCart, Grid, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { cartItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const totalItems = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0), 
    [cartItems]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" />, thaiName: 'หน้าหลัก' },
    { name: 'Shop', href: '/product', icon: <ShoppingCart className="h-5 w-5" />, thaiName: 'ร้านค้า' },
    { name: 'Categories', href: '/categories', icon: <Grid className="h-5 w-5" />, thaiName: 'หมวดหมู่' },
    { name: 'Account', href: '/account', icon: <User className="h-5 w-5" />, thaiName: 'บัญชีผู้ใช้' },
    { name: 'About', href: '/about', icon: <Info className="h-5 w-5" />, thaiName: 'เกี่ยวกับ' },
  ], []);

  const headerClass = useMemo(() => `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  }`, [isScrolled]);

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Aura<span className="text-pink-500">Clear</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.thaiName || link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Link href="/points">
                <Button variant="ghost" size="icon" className="relative" aria-label="Points">
                  <Award className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Header Actions - Simplified */}
            <div className="flex items-center space-x-2 md:hidden">
              <Link href="/points">
                <Button variant="ghost" size="icon" className="relative h-10 w-10" aria-label="Points">
                  <Award className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative h-10 w-10" aria-label="Wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative h-10 w-10" aria-label="Cart">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetTitle className="sr-only">เมนูนำทาง</SheetTitle>
                  <div className="flex flex-col h-full py-6">
                    <div className="flex items-center justify-between mb-8">
                      <Link href="/" className="text-xl font-bold">
                        Aura<span className="text-pink-500">Clear</span>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                      >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </Button>
                    </div>
                    <nav className="flex flex-col space-y-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`text-lg font-medium transition-colors hover:text-primary flex items-center ${
                            pathname === link.href
                              ? 'text-pink-500'
                              : 'text-muted-foreground'
                          }`}
                        >
                          <span className="mr-3">{link.icon}</span>
                          {link.thaiName || link.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto space-y-4">
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <User className="mr-2 h-5 w-5" />
                        บัญชีผู้ใช้
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <Search className="mr-2 h-5 w-5" />
                        ค้นหา
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                        <Link href="/points">
                          <Award className="mr-2 h-5 w-5" />
                          คะแนนสะสม
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                        <Link href="/wishlist">
                          <Heart className="mr-2 h-5 w-5" />
                          สินค้าที่ชอบ
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                        <Link href="/cart">
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          ตะกร้าสินค้า
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - App-like experience */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-border">
        <div className="flex justify-around items-center h-16">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full pt-1 transition-colors ${
                pathname === link.href
                  ? 'text-pink-500'
                  : 'text-muted-foreground'
              }`}
            >
              <div className="mb-1">
                {link.icon}
              </div>
              <span className="text-xs font-medium">{link.thaiName || link.name}</span>
              {pathname === link.href && (
                <span className="absolute bottom-0 w-10 h-1 bg-pink-500 rounded-t-md transition-all duration-200"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile content padding to account for bottom navigation */}
      <div className="md:hidden pb-16"></div>
    </>
  );
});

Header.displayName = 'Header';

export default Header;