'use client'


import { Input } from "@/components/ui/input"

  

  
  export default function  CommandDemo() {
    return (
        <div>
            <section>
            <h1>New Sales</h1>
            <aside>
                <span>Sales</span> &gt;
                <span>new sales</span>
            </aside>
            </section>
            <section>
            <Input placeholder="Customer Name" />

            </section>
      
        </div>
    )
  }
  