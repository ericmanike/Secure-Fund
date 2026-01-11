import { NextRequest, NextResponse } from "next/server";
import { Resend} from "resend";


export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
        from: "Nyamekye Loans <info@nyamekyeloans.com>",
        to: "nyamekyejoshua1720@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: ` <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p> Thank you </p>
        
      `,   


    })

  }
    catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
    return NextResponse.json(
        { message: "Form submitted successfully" },
        { status: 200 }
        );
}
