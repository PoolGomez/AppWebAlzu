import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function SellPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center text-xl">
        <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
        Vender
      </div>

      {/* INFORMATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
        <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
          <div>
            <Image
              src="/images/company-icon.png"
              alt="image"
              width={50}
              height={50}
              className="mb-3 rounded-lg"
            />

            {/* FORM*/}
            {/* <CompanyForm company={company} /> */}

          </div>
        </div>

        <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2">
              {/* <User className="w-5 h-5" /> */}
              Contacts
            </div>
            {/* <div>
              <NewContact />
            </div> */}
          </div>
          {/* <ListContacts company={company} /> */}
        </div>
      </div>
    </div>
  );
}
