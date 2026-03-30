"""Topics / traffic service — returns mock data until a real DB is connected."""
from app.schemas.topics import InquiryTopicSchema, ProspectPrioritySchema, TrafficRowSchema, TopicsResponse


async def fetch(campus: str, period: str, channel: str) -> TopicsResponse:
    inquiry_topics = [
        InquiryTopicSchema(label="Tuition & Fees",       pct=42, color="bg-accent-blue"),
        InquiryTopicSchema(label="Admission Deadlines",   pct=28, color="bg-accent-purple"),
        InquiryTopicSchema(label="Core Curriculum",       pct=18, color="bg-accent-orange"),
        InquiryTopicSchema(label="Campus Tour Booking",   pct=12, color="bg-accent-green"),
        InquiryTopicSchema(label="Scholarships",          pct=11, color="bg-primary"),
        InquiryTopicSchema(label="Sports & Clubs",        pct=9,  color="bg-accent-pink"),
        InquiryTopicSchema(label="International Visa",    pct=7,  color="bg-accent-mint"),
        InquiryTopicSchema(label="Housing Options",       pct=6,  color="bg-accent-light-purple"),
        InquiryTopicSchema(label="Entrance Exams",        pct=4,  color="bg-slate-400"),
        InquiryTopicSchema(label="Placement Support",     pct=3,  color="bg-white/20"),
    ]

    prospect_priority = [
        ProspectPrioritySchema(label="Premium",       pct=12, color="bg-accent-pink",   tooltip="Highest value leads with immediate intent and perfect fit profile."),
        ProspectPrioritySchema(label="Important",     pct=18, color="bg-accent-purple", tooltip="Strong prospects who have engaged with multiple outreach channels."),
        ProspectPrioritySchema(label="Moderate",      pct=25, color="bg-accent-blue",   tooltip="Steady interest shown, currently in the regular nurture cycle."),
        ProspectPrioritySchema(label="Low Priority",  pct=22, color="bg-primary",       tooltip="Informational inquiries with low conversion signal so far."),
        ProspectPrioritySchema(label="Cold Case",     pct=15, color="bg-slate-700",     tooltip="No activity in over 30 days; requires re-engagement campaign."),
        ProspectPrioritySchema(label="Not Scored Yet",pct=8,  color="bg-accent-orange", tooltip="New entries currently being processed by the AI qualification engine."),
    ]

    traffic = [
        TrafficRowSchema(channel="Website",  color="bg-primary",       cells=[5,10,30,50,80,100,90,60,20,10,5,5]),
        TrafficRowSchema(channel="WhatsApp", color="bg-accent-green",  cells=[5,10,20,40,70,100,100,60,30,10,5,5]),
    ]

    return TopicsResponse(inquiry_topics=inquiry_topics, prospect_priority=prospect_priority, traffic=traffic)
