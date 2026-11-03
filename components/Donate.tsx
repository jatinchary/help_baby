"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Banknote,
  Check,
  Copy,
  Heart,
  Info,
  Landmark,
  Lock,
  QrCode,
  Send,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatInr, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function buildUpiUri(amount: number | null) {
  const params = new URLSearchParams({
    pa: siteConfig.donation.upiId,
    pn: siteConfig.donation.payeeName,
    tn: "Hania Cancer Fund",
    cu: "INR",
  });
  if (amount && amount > 0) {
    params.set("am", String(amount));
  }
  return `upi://pay?${params.toString()}`;
}

function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-hope-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope",
        className,
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-hope" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function Donate() {
  const { donation, contact } = siteConfig;
  const [preset, setPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", message: "" });

  const customValue = Number.parseInt(customAmount, 10);
  const amount = Number.isFinite(customValue) && customValue > 0 ? customValue : preset;
  const upiUri = useMemo(() => buildUpiUri(amount), [amount]);
  const whatsappBase = `https://wa.me/${contact.whatsapp}`;

  function choosePreset(value: number) {
    setPreset(value);
    setCustomAmount("");
  }

  function onCustomChange(value: string) {
    const digitsOnly = value.replace(/[^\d]/g, "").slice(0, 7);
    setCustomAmount(digitsOnly);
    setPreset(null);
  }

  function submitDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      "Hello, I have made a donation towards Hania's treatment.",
      form.name.trim() ? `Name: ${form.name.trim()}` : "",
      form.amount ? `Amount: INR ${form.amount}` : "",
      form.message.trim() ? `Message: ${form.message.trim()}` : "",
      "",
      "Please confirm once received. Thank you.",
    ].filter(Boolean);
    const url = `${whatsappBase}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setFormOpen(false);
  }

  return (
    <section id="donate" className="relative overflow-hidden bg-hero py-16 sm:py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl"
      />

      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            Donate today
          </p>
          <h2 className="section-title">Help Hania finish her fight</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Scan the QR code with any UPI app, or use the UPI ID below. Every
            rupee goes directly to Hania&apos;s father, Mr. Mohd Shareef — no
            platform fee, no middleman.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
            <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-rose-200/40 sm:p-7">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-hope">
                    <QrCode className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">Scan &amp; pay</p>
                    <p className="text-[0.68rem] text-gray-500">
                      Any UPI app · Google Pay, PhonePe, Paytm, BHIM
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-green-700">
                  UPI
                </span>
              </div>

              <div className="mt-5 flex justify-center">
                <div className="relative rounded-2xl border-2 border-dashed border-teal-100 bg-white p-3 sm:p-4">
                  <QRCodeSVG
                    value={upiUri}
                    size={256}
                    level="M"
                    marginSize={2}
                    bgColor="#FFFFFF"
                    fgColor="#1F2937"
                    title={`UPI QR code for ${donation.payeeName}${
                      amount ? `, amount ${formatInr(amount)}` : ""
                    }`}
                    className="h-auto w-full max-w-[256px]"
                  />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-hope px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                    {amount ? formatInr(amount) : "Scan to donate"}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-cream p-4">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Pay to
                </p>
                <p className="mt-1 font-heading text-base font-bold text-ink">
                  {donation.payeeName}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <code className="rounded-lg bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-gray-700">
                    {donation.upiId}
                  </code>
                  <CopyButton value={donation.upiId} label="Copy UPI ID" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" className="flex-1">
                  <a href={upiUri}>
                    <Smartphone className="h-4 w-4" aria-hidden="true" />
                    Open in UPI app
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="flex-1 border border-rose-100"
                >
                  <a href="#contact">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Ask the family
                  </a>
                </Button>
              </div>

              <p className="mt-3 flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-gray-500">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hope" aria-hidden="true" />
                {donation.upiIdNote}
              </p>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-xl shadow-rose-200/30 sm:p-7">
              <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rose-700">
                <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
                Choose an amount
              </p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-ink">
                How much would you like to give?
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {donation.presets.map((value) => {
                  const active = !customAmount && preset === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => choosePreset(value)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-3 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2",
                        active
                          ? "border-hope bg-hope text-white shadow-md shadow-teal-200"
                          : "border-rose-100 bg-white text-gray-700 hover:border-teal-200 hover:bg-teal-50/60",
                      )}
                    >
                      {formatInr(value)}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <Label htmlFor="custom-amount" className="text-xs text-gray-500">
                  Or enter a custom amount (INR)
                </Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    id="custom-amount"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="e.g. 1500"
                    value={customAmount}
                    onChange={(event) => onCustomChange(event.target.value)}
                    aria-describedby="custom-amount-help"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="shrink-0 border border-rose-100"
                    onClick={() => {
                      setCustomAmount("");
                      setPreset(null);
                    }}
                    disabled={!amount}
                  >
                    Clear
                  </Button>
                </div>
                <p id="custom-amount-help" className="mt-1.5 text-[0.68rem] text-gray-500">
                  The QR code updates automatically{amount ? ` for ${formatInr(amount)}` : ""}.
                  Leave it blank to let the donor choose.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-teal-900">
                  <ShieldCheck className="h-4 w-4 text-hope" aria-hidden="true" />
                  Safety check
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.72rem] leading-relaxed text-teal-900/80">
                  <li>Confirm the payee name shows “{donation.payeeName}”.</li>
                  <li>Never share your UPI PIN or OTP with anyone.</li>
                  <li>After paying, send the family a message so they can thank you.</li>
                </ul>
              </div>

              <Button
                size="lg"
                className="mt-5 w-full"
                onClick={() => setFormOpen(true)}
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                I&apos;ve donated
              </Button>

              <details className="group mt-5 rounded-2xl border border-rose-100 bg-cream/60 p-4 open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-hope" aria-hidden="true" />
                    Bank transfer details
                  </span>
                  <span className="text-xs font-semibold text-hope group-open:hidden">
                    View
                  </span>
                  <span className="hidden text-xs font-semibold text-hope group-open:inline">
                    Hide
                  </span>
                </summary>

                {donation.bank ? (
                  <dl className="mt-3 space-y-2 text-sm">
                    {[
                      ["Account holder", donation.bank.holder],
                      ["Account number", donation.bank.number],
                      ["IFSC", donation.bank.ifsc],
                      ["Bank", donation.bank.name],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-lg bg-cream px-3 py-2"
                      >
                        <div>
                          <dt className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-gray-500">
                            {label}
                          </dt>
                          <dd className="font-mono text-xs font-semibold text-gray-700">
                            {value}
                          </dd>
                        </div>
                        <CopyButton value={value} label={`Copy ${label}`} />
                      </div>
                    ))}
                  </dl>
                ) : (
                  <div className="mt-3 rounded-lg bg-cream p-3">
                    <p className="text-xs leading-relaxed text-gray-500">
                      Hania&apos;s family uses a verified ICICI Bank account for
                      UPI donations. To protect the account, full bank transfer
                      details are not published here — please{" "}
                      <a
                        href="#contact"
                        className="font-semibold text-hope underline underline-offset-2"
                      >
                        message the family on WhatsApp
                      </a>{" "}
                      and they will share them with you directly.
                    </p>
                  </div>
                )}
              </details>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.68rem] text-gray-500">
                <Lock className="h-3 w-3" aria-hidden="true" />
                No payment is processed on this website. Your UPI app handles the
                transfer directly.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-heading text-xl font-extrabold">
            Tell the family about your donation
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            This opens WhatsApp with your message. Nothing is stored on this
            website.
          </DialogDescription>

          <form onSubmit={submitDonation} className="mt-2 space-y-3">
            <div>
              <Label htmlFor="donor-name">Your name</Label>
              <Input
                id="donor-name"
                className="mt-1.5"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Name or “Anonymous”"
                required
                maxLength={80}
              />
            </div>
            <div>
              <Label htmlFor="donor-amount">Amount (INR)</Label>
              <Input
                id="donor-amount"
                className="mt-1.5"
                inputMode="numeric"
                value={form.amount}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    amount: event.target.value.replace(/[^\d]/g, "").slice(0, 7),
                  }))
                }
                placeholder={amount ? String(amount) : "e.g. 1000"}
                required
              />
            </div>
            <div>
              <Label htmlFor="donor-message">Message (optional)</Label>
              <Textarea
                id="donor-message"
                className="mt-1.5"
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                placeholder="A few words of support for Hania and her family"
                maxLength={300}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              <Send className="h-4 w-4" aria-hidden="true" />
              Send via WhatsApp
            </Button>
          </form>

          <p className="text-center text-[0.65rem] leading-relaxed text-gray-500">
            <Banknote className="mr-1 inline h-3 w-3" aria-hidden="true" />
            Your donation is sent directly through your UPI app, not through this
            form.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
