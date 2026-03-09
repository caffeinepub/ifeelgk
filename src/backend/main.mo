import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type ContactRequest = {
    name : Text;
    email : Text;
    message : Text;
    collaborationRequest : Bool;
  };

  let contactRequests = List.empty<ContactRequest>();

  public query ({ caller }) func getArtistInfo() : async Text {
    "IFEELGK is a pioneering artist in the world of Hip-Hop, blending deep emotions with gritty street sounds and introspective themes. His music bridges personal pain with broader social issues, making an impact that resonates beyond the surface.";
  };

  /// Submit a general inquiry or collaboration request
  public shared ({ caller }) func submitContactRequest(name : Text, email : Text, message : Text, collaborationRequest : Bool) : async () {
    if (name.isEmpty() or email.isEmpty() or message.isEmpty()) {
      Runtime.trap("All fields must be completed.");
    };
    let newRequest : ContactRequest = {
      name;
      email;
      message;
      collaborationRequest;
    };
    contactRequests.add(newRequest);
  };

  /// Retrieve all contact requests, including collaboration inquiries
  public query ({ caller }) func getAllContactRequests() : async [ContactRequest] {
    contactRequests.toArray();
  };
};
