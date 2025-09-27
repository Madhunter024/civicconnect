import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

const Logo = () => (
  <Link href="/home" className="flex items-center space-x-3">
    <div className="bg-gradient-to-r from-orange-600 to-green-600 p-2 rounded-xl shadow-lg">
      <BarChart3 className="w-6 h-6 text-white" />
    </div>
    <div>
      <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
        Civic Connect
      </h1>
      <p className="text-xs text-gray-600">झारखंड सरकार</p>
    </div>
  </Link>
);

export default Logo;
